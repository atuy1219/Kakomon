import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, User, Mail, Calendar, FileText, MessageSquare } from "lucide-react"
import { mockUser, mockExams, mockQuestions } from "@/lib/mock-data"

export default function AccountPage() {
  const examsCount = mockExams.filter((e) => e.user_id === mockUser.id).length
  const questionsCount = mockQuestions.filter((q) => q.user_id === mockUser.id).length

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
          <h1 className="text-xl font-bold">アカウント</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{mockUser.display_name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {mockUser.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  登録日: {new Date(mockUser.created_at || "").toLocaleDateString("ja-JP")}
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{examsCount}</p>
                      <p className="text-xs text-muted-foreground">投稿した過去問</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{questionsCount}</p>
                      <p className="text-xs text-muted-foreground">投稿した質問</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>アカウント管理</CardTitle>
              <CardDescription>プロフィールとアカウント設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/settings">
                  <User className="h-4 w-4 mr-2" />
                  設定
                </Link>
              </Button>
              <Badge variant="secondary" className="w-full justify-center py-2">
                デモモード（認証なし）
              </Badge>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
