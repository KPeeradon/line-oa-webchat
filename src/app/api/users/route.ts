import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {
      lastActive: "desc",
    },
  })

  return NextResponse.json(users)
}