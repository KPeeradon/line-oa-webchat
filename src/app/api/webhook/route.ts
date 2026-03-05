import { NextResponse } from "next/server"
import { users, messages, Message } from "@/lib/chatStore"

export async function POST(req: Request) {
    const body = await req.json()

    const event = body.events?.[0]

    if (event?.type === "message" && event.message.type === "text") {
        const userId = event.source.userId
        const text = event.message.text

        if (!users[userId]) {
            users[userId] = {
                userId,
                name: userId,
                unread: 0,
                lastActive: Date.now(),
            }
        }

        users[userId].lastActive = Date.now()
        users[userId].unread += 1

        if (!messages[userId]) {
            messages[userId] = []
        }

        const msg: Message = {
            role: "user",
            text,
            userId,
        }

        messages[userId].push(msg)

        const io = (global as any).io

        if (io) {
            io.emit("new_message", msg)
            io.emit("users_update", Object.values(users))
        }
    }

    return NextResponse.json({ ok: true })
}