import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, FileText, Sparkles, MessageSquare } from "lucide-react"
import { getMockProfessorById, getMockExams } from "@/lib/mock-data"
import { redirect } from "next/navigation"

export default async function ProfessorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const professor = getMockProfessorById(id)

  if (!professor) {
    redirect("/study/faculties")
  }

  const exams = getMockExams(id)

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/study/professors?subject=${professor.subject_id}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">{professor.name}</h1>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{professor.name}の過去問</h2>
          <p className="text-muted-foreground">{exams.length}件の過去問が登録されています</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>過去問を閲覧</CardTitle>
                  <CardDescription>登録された過去問を見る</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/exams/view?professor=${id}`}>閲覧する</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>類題を作成</CardTitle>
                  <CardDescription>AIで類似問題を生成</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href={`/exams/generate?professor=${id}`}>作成する</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>質問を作成</CardTitle>
                  <CardDescription>過去問について質問</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href={`/questions/create?professor=${id}`}>質問する</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
