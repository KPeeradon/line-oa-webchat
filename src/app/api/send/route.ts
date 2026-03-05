import axios from "axios"
import { NextResponse } from "next/server"
import { messages, Message } from "@/lib/chatStore"

export async function POST(req: Request) {
    const { userId, message } = await req.json()

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

    const msg: Message = {
        role: "admin",
        text: message,
        userId,
    }

    if (!messages[userId]) {
        messages[userId] = []
    }

    messages[userId].push(msg)

    const io = (global as any).io

    if (io) {
        io.emit("new_message", msg)
    }

    return NextResponse.json({ success: true })
}