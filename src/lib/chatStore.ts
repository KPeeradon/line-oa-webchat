export const messages: { role: "user" | "oa"; text: string }[] = []

// เก็บ userId ของ LINE ที่ทักเข้ามาครั้งแรก
export let lineUserId: string | null = null

export function setLineUserId(id: string) {
  lineUserId = id
}