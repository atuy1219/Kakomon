import { NextResponse } from "next/server"

export async function POST() {
  // Supabase ログアウト処理は削除済み。
  // セッション管理を行う場合はここに実装してください。
  return NextResponse.redirect(new URL("/auth/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}
