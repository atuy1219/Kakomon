"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"

type Faculty = { id: string; name: string }
type Department = { id: string; name: string; faculty_id: string }
type Subject = { id: string; name: string; department_id: string }
type Professor = { id: string; name: string; subject_id: string }

export default function SharePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedProfessor, setSelectedProfessor] = useState("")

  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [professors, setProfessors] = useState<Professor[]>([])

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadFaculties()
  }, [])

  useEffect(() => {
    if (selectedFaculty) {
      loadDepartments(selectedFaculty)
      setSelectedDepartment("")
      setSelectedSubject("")
      setSelectedProfessor("")
    }
  }, [selectedFaculty])

  useEffect(() => {
    if (selectedDepartment) {
      loadSubjects(selectedDepartment)
      setSelectedSubject("")
      setSelectedProfessor("")
    }
  }, [selectedDepartment])

  useEffect(() => {
    if (selectedSubject) {
      loadProfessors(selectedSubject)
      setSelectedProfessor("")
    }
  }, [selectedSubject])

  const loadFaculties = async () => {
    const { data } = await supabase.from("faculties").select("*").order("name")
    if (data) setFaculties(data)
  }

  const loadDepartments = async (facultyId: string) => {
    const { data } = await supabase.from("departments").select("*").eq("faculty_id", facultyId).order("name")
    if (data) setDepartments(data)
  }

  const loadSubjects = async (departmentId: string) => {
    const { data } = await supabase.from("subjects").select("*").eq("department_id", departmentId).order("name")
    if (data) setSubjects(data)
  }

  const loadProfessors = async (subjectId: string) => {
    const { data } = await supabase.from("professors").select("*").eq("subject_id", subjectId).order("name")
    if (data) setProfessors(data)
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

      const { error: insertError } = await supabase.from("past_exams").insert({
        professor_id: selectedProfessor,
        user_id: user.id,
        title,
        content,
        year: year ? Number.parseInt(year) : null,
        semester: semester || null,
      })

      if (insertError) throw insertError

      router.push("/home")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "投稿に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/home">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">過去問を共有</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>過去問を投稿</CardTitle>
            <CardDescription>過去問を共有して、みんなの学習をサポートしましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="faculty">学部</Label>
                  <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                    <SelectTrigger id="faculty">
                      <SelectValue placeholder="学部を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {faculties.map((faculty) => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedFaculty && (
                  <div className="grid gap-2">
                    <Label htmlFor="department">学科</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="学科を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedDepartment && (
                  <div className="grid gap-2">
                    <Label htmlFor="subject">科目</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="科目を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedSubject && (
                  <div className="grid gap-2">
                    <Label htmlFor="professor">教授</Label>
                    <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="教授を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {professors.map((professor) => (
                          <SelectItem key={professor.id} value={professor.id}>
                            {professor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {selectedProfessor && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input
                      id="title"
                      placeholder="例: 2023年度 期末試験"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="year">年度（任意）</Label>
                      <Input
                        id="year"
                        type="number"
                        placeholder="2023"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="semester">学期（任意）</Label>
                      <Select value={semester} onValueChange={setSemester}>
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="前期">前期</SelectItem>
                          <SelectItem value="後期">後期</SelectItem>
                          <SelectItem value="通年">通年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">問題内容</Label>
                    <Textarea
                      id="content"
                      placeholder="過去問の内容を入力してください"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={10}
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "投稿中..." : "投稿する"}
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
