import { NextResponse } from "next/server"
import { messages, users } from "@/lib/chatStore"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json([])
  }

  const data = messages[userId] || []

  const user = users[userId]
  if (user) {
    user.unread = 0
  }

  return NextResponse.json(data)
}