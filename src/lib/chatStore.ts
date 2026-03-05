export type Message = {
  userId: string
  role: "user" | "admin"
  text: string
}

export type User = {
  userId: string
  name: string
  lastActive: number
  unread: number
}

export const messages: Message[] = []
export const users: User[] = []