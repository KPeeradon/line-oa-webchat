import axios from "axios"
import { NextResponse } from "next/server"
import { messages, setLineUserId } from "@/lib/chatStore"

export async function POST(req: Request) {
    const body = await req.json()
    const event = body.events?.[0]

    if (!event) return NextResponse.json({ status: "no event" })

    // get userId
    if (event.source?.userId) {
        setLineUserId(event.source.userId)
    }

    if (event.type === "message" && event.message.type === "text") {
        const userMessage = event.message.text

        messages.push({ role: "oa", text: userMessage })

        await axios.post(
            "https://api.line.me/v2/bot/message/reply",
            {
                replyToken: event.replyToken,
                messages: [
                    {
                        type: "text",
                        text: `คุณพิมพ์ข้อความ ${userMessage}`,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        )
    }

    return NextResponse.json({ status: "ok" })
}