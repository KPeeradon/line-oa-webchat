import { NextResponse } from "next/server"
import { messages, users } from "@/lib/chatStore"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  const data = messages.filter((m) => m.userId === userId)

  const user = users.find((u) => u.userId === userId)
  if (user) user.unread = 0

  return NextResponse.json(data)
}