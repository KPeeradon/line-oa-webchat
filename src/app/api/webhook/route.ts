import axios from "axios"
import { NextResponse } from "next/server"
import { messages, users } from "@/lib/chatStore"

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

        const exists = users.find((u) => u.userId === userId)

        if (!exists) {
            const profile = await axios.get(
                `https://api.line.me/v2/bot/profile/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
                    },
                }
            )

            users.push({
                userId,
                name: profile.data.displayName,
            })
        }
    }

    return NextResponse.json({ status: "ok" })
}