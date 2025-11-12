import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ChevronLeft, Calendar, MessageSquare } from "lucide-react"
import { getMockExamById, getMockProfessorById, getMockQuestions } from "@/lib/mock-data"
import { redirect } from "next/navigation"

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const exam = getMockExamById(id)

  if (!exam) {
    redirect("/home")
  }

  const professor = getMockProfessorById(exam.professor_id)
  const questions = getMockQuestions(id)

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/exams/view?professor=${exam.professor_id}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">過去問詳細</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{exam.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-3">
                    {exam.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exam.year}年
                      </span>
                    )}
                    {exam.semester && <Badge variant="secondary">{exam.semester}</Badge>}
                    {exam.exam_type && <Badge variant="outline">{exam.exam_type}</Badge>}
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">{professor?.name} 教授</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-3">問題内容</h3>
                <p className="whitespace-pre-wrap text-foreground">{exam.content}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    質問 ({questions.length})
                  </CardTitle>
                  <CardDescription>この過去問に関する質問</CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link href={`/questions/create?exam=${id}`}>質問する</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {questions && questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="space-y-2">
                        <h4 className="font-semibold">{question.title}</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{question.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(question.created_at).toLocaleDateString("ja-JP")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">まだ質問がありません</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
