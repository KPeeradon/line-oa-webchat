import { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export function getIO() {
  return io;
}

export function initIO(server: any) {
  if (!io) {
    io = new IOServer(server, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });
  }
  return io;
}