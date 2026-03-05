import { NextResponse } from "next/server"
import { messages } from "@/lib/chatStore"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  const data = messages.filter((m) => m.userId === userId)

  return NextResponse.json(data)
}