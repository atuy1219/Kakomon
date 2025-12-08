"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getMockProfessors, getMockSubjectById } from "@/lib/mock-data"

function ProfessorsContent() {
  const searchParams = useSearchParams()
  const subject = searchParams.get("subject")

  if (!subject) {
    return (
      <div className="flex flex-col min-h-svh bg-background items-center justify-center">
        <p className="text-foreground">科目を選択してください</p>
      </div>
    )
  }

  const subjectData = getMockSubjectById(subject)
  const professors = getMockProfessors(subject)

  return (
    <div className="flex flex-col min-h-svh bg-background">
      {/* PDFの青いヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            href={`/study/subjects?department=${subjectData?.department_id}`}
            className="hover:bg-primary/80"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">戻る</span>
          </Button>
          <div className="text-center absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">{subjectData?.name}</h1>
          </div>
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col p-4 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-center text-foreground">
            教授を選んでください
          </h2>

          <div className="flex flex-col gap-4">
            {professors.map((professor) => (
              <Button
                key={professor.id}
                variant="secondary"
                className="w-full justify-start"
                size="default"
                href={`/study/professor/${professor.id}`}
              >
                {professor.name}
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProfessorsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh bg-background items-center justify-center">
          <p className="text-foreground">読み込み中...</p>
        </div>
      }
    >
      <ProfessorsContent />
    </Suspense>
  )
}