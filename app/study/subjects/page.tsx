import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ department: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  if (!params.department) {
    redirect("/study/faculties")
  }

  const { data: department } = await supabase
    .from("departments")
    .select("*, faculties(*)")
    .eq("id", params.department)
    .single()

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .eq("department_id", params.department)
    .order("name")

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
            <p className="text-sm text-muted-foreground">
              {department?.faculties?.name} / {department?.name}
            </p>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {subjects?.map((subject) => (
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
