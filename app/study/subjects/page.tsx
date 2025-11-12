import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getMockSubjects, getMockDepartmentById } from "@/lib/mock-data"
import { redirect } from "next/navigation"

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ department: string }>
}) {
  const params = await searchParams

  if (!params.department) {
    redirect("/study/faculties")
  }

  const department = getMockDepartmentById(params.department)
  const subjects = getMockSubjects(params.department)

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/study/departments?faculty=${department?.faculty_id}`}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">科目を選択</h1>
            <p className="text-sm text-muted-foreground">{department?.name}</p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={`/study/professors?subject=${subject.id}`}>選択</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
