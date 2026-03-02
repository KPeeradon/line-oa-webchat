# LINE OA Web Chat

โปรเจคทดสอบการเชื่อมต่อ LINE Official Account (Messaging API) กับ Web Chat โดยใช้ Next.js

## ความสามารถหลัก

- ส่งข้อความจาก Web ไปยัง LINE OA
- รับข้อความจาก LINE OA ผ่าน Webhook
- แสดงข้อความตอบกลับบนหน้าเว็บ
- ใช้ in-memory store สำหรับเก็บข้อความ (ไม่ได้ใช้ database)

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- LINE Messaging API

## การติดตั้ง

```bash
npm install
npm run dev