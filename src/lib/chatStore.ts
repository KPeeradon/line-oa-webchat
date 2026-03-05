export type Message = {
    userId: string
    role: "user" | "admin"
    text: string
}

export type User = {
    userId: string
    name: string
}

export const messages: Message[] = []
export const users: User[] = []