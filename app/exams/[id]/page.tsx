import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ChevronLeft, Calendar, User, MessageSquare } from "lucide-react"

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: exam } = await supabase
    .from("past_exams")
    .select("*, profiles(display_name), professors(*, subjects(*, departments(*, faculties(*))))")
    .eq("id", id)
    .single()

  if (!exam) {
    redirect("/home")
  }

  const { data: questions } = await supabase
    .from("questions")
    .select("*, profiles(display_name)")
    .eq("past_exam_id", id)
    .order("created_at", { ascending: false })

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
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {exam.profiles?.display_name || "匿名"}
                    </span>
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{exam.professors?.subjects?.departments?.faculties?.name}</p>
                  <p>
                    {exam.professors?.subjects?.departments?.name} / {exam.professors?.subjects?.name}
                  </p>
                  <p className="font-medium">{exam.professors?.name}</p>
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
                    質問 ({questions?.length || 0})
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
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold">{question.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {question.profiles?.display_name || "匿名"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{question.content}</p>
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
