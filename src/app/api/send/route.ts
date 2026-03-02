import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { message } = await req.json()

        await axios.post(
            'https://api.line.me/v2/bot/message/broadcast',
            {
                messages: [{ type: 'text', text: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error(error.response?.data || error.message)

        return NextResponse.json(
            { success: false, error: 'Failed to send message' },
            { status: 500 }
        )
    }
}