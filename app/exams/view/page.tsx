import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, Calendar, User } from "lucide-react"

export default async function ViewExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ professor: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  if (!params.professor) {
    redirect("/study/faculties")
  }

  const { data: professor } = await supabase
    .from("professors")
    .select("*, subjects(*, departments(*, faculties(*)))")
    .eq("id", params.professor)
    .single()

  const { data: exams } = await supabase
    .from("past_exams")
    .select("*, profiles(display_name)")
    .eq("professor_id", params.professor)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/study/professor/${params.professor}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">過去問一覧</h1>
            <p className="text-sm text-muted-foreground">{professor?.name}</p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {exams && exams.length > 0 ? (
          <div className="grid gap-4 max-w-4xl mx-auto">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{exam.title}</CardTitle>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 whitespace-pre-wrap">{exam.content}</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={`/exams/${exam.id}`}>詳細を見る</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>過去問がありません</CardTitle>
              <CardDescription>この教授の過去問はまだ投稿されていません</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/share">最初の過去問を投稿する</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
