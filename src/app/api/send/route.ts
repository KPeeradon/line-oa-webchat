import axios from "axios"
import { NextResponse } from "next/server"
import { messages, lineUserId } from "@/lib/chatStore"

export async function POST(req: Request) {
    try {
        const { message } = await req.json()

        if (!lineUserId) {
            return NextResponse.json(
                { success: false, error: "No LINE user connected yet" },
                { status: 400 }
            )
        }

        // เก็บข้อความฝั่ง user (เว็บ)
        messages.push({ role: "user", text: message })

        await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                to: lineUserId,
                messages: [{ type: "text", text: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        )

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error(error.response?.data || error.message)

        return NextResponse.json(
            { success: false, error: "Failed to send message" },
            { status: 500 }
        )
    }
}