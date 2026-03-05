export type Message = {
    userId: string
    role: "user" | "admin"
    text: string
}

export type User = {
    userId: string
    name: string
    unread: number
    lastActive: number
}

export const users: Record<string, User> = {}

export const messages: Record<string, Message[]> = {}