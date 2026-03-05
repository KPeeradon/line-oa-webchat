import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const event = body.events?.[0]

  if (event?.type === "message" && event.message.type === "text") {
    const userId = event.source.userId
    const text = event.message.text

    await prisma.user.upsert({
      where: { id: userId },
      update: {
        lastActive: new Date(),
        unread: { increment: 1 },
      },
      create: {
        id: userId,
        name: "LINE User",
        unread: 1,
      },
    })

    await prisma.message.create({
      data: {
        userId,
        role: "user",
        text,
      },
    })
  }

  return NextResponse.json({ status: "ok" })
}