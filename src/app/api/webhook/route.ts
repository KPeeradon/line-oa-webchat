import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()

    console.log('Webhook event:', body)

    return NextResponse.json({ status: 'ok' })
}