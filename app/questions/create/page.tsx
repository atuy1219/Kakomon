"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, MessageSquare, AlertCircle } from "lucide-react"

type PastExam = {
  id: string
  title: string
  content: string
  year: number | null
  semester: string | null
  professors: {
    name: string
    subjects: {
      name: string
    }
  }
}

export default function CreateQuestionPage() {
  const searchParams = useSearchParams()
  const professorId = searchParams.get("professor")
  const examId = searchParams.get("exam")

  const [exams, setExams] = useState<PastExam[]>([])
  const [selectedExam, setSelectedExam] = useState(examId || "")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (professorId) {
      loadExams(professorId)
    }
  }, [professorId])

  const loadExams = async (profId: string) => {
    const { data } = await supabase
      .from("past_exams")
      .select("id, title, content, year, semester, professors(name, subjects(name))")
      .eq("professor_id", profId)
      .order("created_at", { ascending: false })

    if (data) setExams(data as PastExam[])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("ログインが必要です")

      if (!selectedExam) throw new Error("過去問を選択してください")

      const { error: insertError } = await supabase.from("questions").insert({
        past_exam_id: selectedExam,
        user_id: user.id,
        title,
        content,
      })

      if (insertError) throw insertError

      router.push(`/exams/${selectedExam}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "質問の投稿に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!professorId && !examId) {
    return (
      <div className="min-h-svh bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>エラー</CardTitle>
            <CardDescription>教授または過去問が選択されていません</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/home">ホームに戻る</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={examId ? `/exams/${examId}` : `/study/professor/${professorId}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">質問を作成</h1>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>質問を投稿</CardTitle>
            <CardDescription>過去問について質問して、みんなで学び合いましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!examId && professorId && (
                <div className="grid gap-2">
                  <Label htmlFor="exam">過去問を選択</Label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger id="exam">
                      <SelectValue placeholder="質問したい過去問を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.title} {exam.year && `(${exam.year}年)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedExam && (
                <>
                  {exams.find((e) => e.id === selectedExam) && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">選択された過去問</h4>
                      <p className="text-sm font-medium mb-1">{exams.find((e) => e.id === selectedExam)?.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {exams.find((e) => e.id === selectedExam)?.content}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="title">質問のタイトル</Label>
                    <Input
                      id="title"
                      placeholder="例: この問題の解き方がわかりません"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">質問内容</Label>
                    <Textarea
                      id="content"
                      placeholder="具体的な質問内容を入力してください"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "投稿中..." : "質問を投稿"}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
