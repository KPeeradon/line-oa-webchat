import axios from "axios"
import { NextResponse } from "next/server"
import { messages } from "@/lib/chatStore"

export async function POST(req: Request) {
    const { userId, message } = await req.json()

    messages.push({
        userId,
        role: "admin",
        text: message,
    })

    await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
            to: userId,
            messages: [
                {
                    type: "text",
                    text: message,
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

    return NextResponse.json({ success: true })
}