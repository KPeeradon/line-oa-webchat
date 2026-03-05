import { NextResponse } from "next/server"
import { messages } from "@/lib/chatStore"

export async function POST(req: Request) {
    const body = await req.json()

    const event = body.events?.[0]

    if (event?.type === "message" && event.message.type === "text") {
        const userId = event.source.userId
        const text = event.message.text

        messages.push({
            userId,
            role: "user",
            text,
        })
    }

    return NextResponse.json({ status: "ok" })
}