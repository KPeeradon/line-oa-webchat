import { Server } from "socket.io"
import { NextResponse } from "next/server"

export async function GET() {
  if (!(global as any).io) {
    console.log("Starting Socket.io server...")

    const io = new Server({
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    })

    io.on("connection", (socket) => {
      console.log("Admin connected")
    })

    ;(global as any).io = io
  }

  return NextResponse.json({ ok: true })
}