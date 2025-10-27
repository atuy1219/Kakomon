import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 })
    }

    const { examContent } = await request.json()
    if (!examContent) {
      return NextResponse.json({ error: "過去問の内容が必要です" }, { status: 400 })
    }

    // ユーザーのAPIキーを取得
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("user_api_keys")
      .select("api_key, provider")
      .eq("user_id", user.id)
      .single()

    if (apiKeyError || !apiKeyData) {
      return NextResponse.json({ error: "APIキーが設定されていません。設定画面で登録してください。" }, { status: 400 })
    }

    // OpenAI APIを使用して類題を生成
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKeyData.api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "あなたは教育専門のAIアシスタントです。与えられた過去問に基づいて、類似した問題を生成してください。問題の難易度と形式は元の問題と同程度にしてください。",
          },
          {
            role: "user",
            content: `以下の過去問に基づいて、類似した問題を1つ生成してください：\n\n${examContent}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenAI API Error:", errorData)
      return NextResponse.json(
        { error: "AI APIの呼び出しに失敗しました。APIキーを確認してください。" },
        { status: 500 },
      )
    }

    const data = await response.json()
    const generatedContent = data.choices[0]?.message?.content

    if (!generatedContent) {
      return NextResponse.json({ error: "類題の生成に失敗しました" }, { status: 500 })
    }

    return NextResponse.json({ generatedContent })
  } catch (error) {
    console.error("Generate similar exam error:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}
