export type Message = {
    userId: string
    role: "user" | "admin"
    text: string
}

export const messages: Message[] = []