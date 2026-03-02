import { NextResponse } from "next/server"
import { messages } from "@/lib/chatStore"

export async function GET() {
  return NextResponse.json(messages)
}