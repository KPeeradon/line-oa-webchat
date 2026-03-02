import { NextResponse } from 'next/server'
import crypto from 'crypto'
import axios from 'axios'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-line-signature') || ''

  // 🔐 verify signature
  const hash = crypto
    .createHmac('sha256', process.env.LINE_CHANNEL_SECRET as string)
    .update(body)
    .digest('base64')

  if (hash !== signature) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  const json = JSON.parse(body)

  for (const event of json.events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userText = event.message.text

      await axios.post(
        'https://api.line.me/v2/bot/message/reply',
        {
          replyToken: event.replyToken,
          messages: [
            {
              type: 'text',
              text: `คุณพิมพ์ข้อความ ${userText}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )
    }
  }

  return NextResponse.json({ status: 'ok' })
}