import { NextResponse } from "next/server"
import { users } from "@/lib/chatStore"

export async function GET() {
  return NextResponse.json(Object.values(users))
}