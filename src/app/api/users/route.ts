import { NextResponse } from "next/server"
import { messages } from "@/lib/chatStore"

export async function GET() {
    const users = [...new Set(messages.map((m) => m.userId))]
    return NextResponse.json(users)
}