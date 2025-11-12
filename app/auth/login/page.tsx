"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

// PDFのデザインカンプ (8枚目) に基づいてレイアウトを変更
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // （デモのため、実際のSupabaseロジックは維持しつつ、UIを変更）
    // ... 既存のロジック ...
    alert("デモ：ログイン処理（モック）")
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      
      {/* PDFの青いヘッダー (戻るボタン付き) */}
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/80">
            {/* ログイン前のため、仮の戻る先としてルートを指定 */}
            <Link href="/">
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
            ログイン
          </h1>
          {/* 右側は空 */}
          <div></div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto flex flex-1 flex-col justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto space-y-10">
          
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base font-semibold">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="大学のメールアドレス"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-2xl" // PDFのスタイル
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-base font-semibold">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="パスワードを入力"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-2xl" // PDFのスタイル
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          
          <div className="flex flex-col items-center gap-6">
            <Button 
              type="submit" 
              className="w-full max-w-xs shadcn-button" // カスタムクラス
              disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>

            <Button variant="link" asChild className="text-muted-foreground">
              <Link href="/auth/sign-up">
                新規作成
              </Link>
            </Button>
          </div>
          
        </form>
      </main>
    </div>
  )
}