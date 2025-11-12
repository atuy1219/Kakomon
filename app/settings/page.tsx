"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronLeft, Save, Key, AlertCircle, CheckCircle } from "lucide-react"
import { mockUser } from "@/lib/mock-data"

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState(mockUser.display_name)
  const [apiKey, setApiKey] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key") || ""
    setApiKey(storedKey)
  }, [])

  const handleUpdateApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!apiKey.trim()) {
        throw new Error("APIキーを入力してください")
      }

      localStorage.setItem("openai_api_key", apiKey)
      setSuccess("APIキーを保存しました")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "保存に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">戻る</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold">設定</h1>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 text-green-700 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>プロフィール設定</CardTitle>
              <CardDescription>デモモードでは変更できません</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="display-name">表示名</Label>
                  <Input
                    id="display-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">デモ版では変更できません</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                AI機能のAPIキー設定
              </CardTitle>
              <CardDescription>類題作成機能を使用するには、OpenAI APIキーが必要です</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateApiKey} className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    APIキーはブラウザのローカルストレージに保存されます（デモ版）
                  </AlertDescription>
                </Alert>

                <div className="grid gap-2">
                  <Label htmlFor="api-key">APIキー</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    OpenAI APIキーは{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      こちら
                    </a>
                    から取得できます
                  </p>
                </div>

                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "保存中..." : "APIキーを保存"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
