"use client"

import type React from "react"

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
import { getMockFaculties, getMockDepartments, getMockSubjects, getMockProfessors } from "@/lib/mock-data"

export default function SharePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [examType, setExamType] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedProfessor, setSelectedProfessor] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const faculties = getMockFaculties()
  const departments = selectedFaculty ? getMockDepartments(selectedFaculty) : []
  const subjects = selectedDepartment ? getMockSubjects(selectedDepartment) : []
  const professors = selectedSubject ? getMockProfessors(selectedSubject) : []

  useEffect(() => {
    setSelectedDepartment("")
    setSelectedSubject("")
    setSelectedProfessor("")
  }, [selectedFaculty])

  useEffect(() => {
    setSelectedSubject("")
    setSelectedProfessor("")
  }, [selectedDepartment])

  useEffect(() => {
    setSelectedProfessor("")
  }, [selectedSubject])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      alert("デモ版のため、実際の投稿は行われません。過去問が投稿されました！")
      router.push("/home")
    }, 500)
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
                    <Label htmlFor="examType">試験の種類（任意）</Label>
                    <Select value={examType} onValueChange={setExamType}>
                      <SelectTrigger id="examType">
                        <SelectValue placeholder="選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="中間試験">中間試験</SelectItem>
                        <SelectItem value="期末試験">期末試験</SelectItem>
                        <SelectItem value="小テスト">小テスト</SelectItem>
                        <SelectItem value="レポート">レポート</SelectItem>
                      </SelectContent>
                    </Select>
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
