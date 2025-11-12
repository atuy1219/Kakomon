"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, Sparkles, AlertCircle } from "lucide-react"
import { getMockExams } from "@/lib/mock-data"

export default function GenerateExamPage() {
  const searchParams = useSearchParams()
  const professorId = searchParams.get("professor")

  const [exams, setExams] = useState<
    Array<{ id: string; title: string; content: string; year: number | null; semester: string | null }>
  >([])
  const [selectedExam, setSelectedExam] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [hasApiKey, setHasApiKey] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key") || ""
    setHasApiKey(!!storedKey)

    if (professorId) {
      const mockExams = getMockExams(professorId)
      setExams(mockExams)
    }
  }, [professorId])

  const handleGenerate = async () => {
    if (!selectedExam) {
      setError("過去問を選択してください")
      return
    }

    setIsLoading(true)
    setError(null)
    setGeneratedContent("")

    try {
      const exam = exams.find((e) => e.id === selectedExam)
      if (!exam) throw new Error("過去問が見つかりません")

      const apiKey = localStorage.getItem("openai_api_key")
      if (!apiKey) {
        throw new Error("APIキーが設定されていません")
      }

      const response = await fetch("/api/generate-similar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examContent: exam.content, apiKey }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "生成に失敗しました")
      }

      const data = await response.json()
      setGeneratedContent(data.content)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "類題の生成に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!professorId) {
    return (
      <div className="min-h-svh bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>エラー</CardTitle>
            <CardDescription>教授が選択されていません</CardDescription>
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
            <Link href={`/study/professor/${professorId}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">AI類題作成</h1>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {!hasApiKey && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                AI機能を使用するには、設定画面でAPIキーを登録してください。
                <Button asChild variant="link" className="px-2">
                  <Link href="/settings">設定画面へ</Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>過去問を選択</CardTitle>
              <CardDescription>類題を生成したい過去問を選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="exam">過去問</Label>
                <Select value={selectedExam} onValueChange={setSelectedExam} disabled={!hasApiKey}>
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="過去問を選択" />
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

              {selectedExam && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">選択された過去問</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {exams.find((e) => e.id === selectedExam)?.content}
                  </p>
                </div>
              )}

              <Button onClick={handleGenerate} disabled={!selectedExam || isLoading || !hasApiKey} className="w-full">
                {isLoading ? "生成中..." : "類題を生成"}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  生成された類題
                </CardTitle>
                <CardDescription>AIが生成した類似問題です</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  生成された内容は編集可能です。必要に応じて修正してください。
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
