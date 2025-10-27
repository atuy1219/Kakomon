"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, Save, Key, AlertCircle, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [provider, setProvider] = useState("openai")
  const [hasExistingKey, setHasExistingKey] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (profile) {
        setDisplayName(profile.display_name || "")
      }

      const { data: apiKeyData } = await supabase
        .from("user_api_keys")
        .select("provider")
        .eq("user_id", user.id)
        .single()

      if (apiKeyData) {
        setHasExistingKey(true)
        setProvider(apiKeyData.provider)
      }
    } catch (error) {
      console.error("Failed to load user data:", error)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("ログインが必要です")

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", user.id)

      if (updateError) throw updateError

      setSuccess("プロフィールを更新しました")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "更新に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("ログインが必要です")

      if (!apiKey.trim()) {
        throw new Error("APIキーを入力してください")
      }

      if (hasExistingKey) {
        const { error: updateError } = await supabase
          .from("user_api_keys")
          .update({ api_key: apiKey, provider, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from("user_api_keys")
          .insert({ user_id: user.id, api_key: apiKey, provider })

        if (insertError) throw insertError
        setHasExistingKey(true)
      }

      setSuccess("APIキーを保存しました")
      setApiKey("")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "保存に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">設定</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 text-green-700 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>プロフィール設定</CardTitle>
              <CardDescription>表示名を変更できます</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="display-name">表示名</Label>
                  <Input
                    id="display-name"
                    type="text"
                    placeholder="山田太郎"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "保存中..." : "保存"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                AI機能のAPIキー設定
              </CardTitle>
              <CardDescription>類題作成機能を使用するには、OpenAI APIキーが必要です</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateApiKey} className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    APIキーは暗号化されてデータベースに保存されます。
                    {hasExistingKey && " 既にAPIキーが登録されています。"}
                  </AlertDescription>
                </Alert>

                <div className="grid gap-2">
                  <Label htmlFor="provider">プロバイダー</Label>
                  <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger id="provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="api-key">APIキー</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder={hasExistingKey ? "新しいAPIキーを入力（変更する場合）" : "sk-..."}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    OpenAI APIキーは{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      こちら
                    </a>
                    から取得できます
                  </p>
                </div>

                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "保存中..." : hasExistingKey ? "APIキーを更新" : "APIキーを保存"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
