# LINE OA Web Chat

Simple web chat สำหรับทดสอบการเชื่อมต่อกับ LINE Official Account (Messaging API)
โดยฝั่งเว็บจะทำหน้าที่เป็น **admin chat** ที่สามารถดูข้อความจากผู้ใช้ และตอบกลับไปยัง LINE ได้

## Features

* รับข้อความจากผู้ใช้ที่ส่งเข้ามาทาง LINE OA
* แสดงรายการผู้ใช้ที่เคยทักเข้ามา
* Admin สามารถเลือกผู้ใช้และตอบกลับข้อความได้
* แสดงสถานะ online ของผู้ใช้ (จาก last activity)
* แสดง unread message badge
* รองรับ realtime chat ด้วย Socket.io

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Socket.io
* LINE Messaging API

## Project Structure

```
src
 ┣ app
 ┃ ┣ api
 ┃ ┃ ┣ messages
 ┃ ┃ ┣ send
 ┃ ┃ ┣ users
 ┃ ┃ ┣ webhook
 ┃ ┃ ┗ socket
 ┃ ┗ page.tsx
 ┗ lib
   ┗ chatStore.ts
```

## Setup

ติดตั้ง dependencies

```
npm install
```

สร้างไฟล์ `.env.local`

```
LINE_CHANNEL_ACCESS_TOKEN=your_token
```

รันโปรเจค

```
npm run dev
```

## Usage

1. ผู้ใช้ส่งข้อความเข้ามาที่ LINE OA
2. Webhook จะรับ event จาก LINE
3. ข้อความจะแสดงในหน้า webchat
4. Admin สามารถเลือก user และตอบกลับได้

## Changelog

### v0.5

* กลับไปใช้ polling

### v0.4

* เพิ่ม realtime chat ด้วย Socket.io
* เพิ่ม online indicator
* เพิ่ม unread message badge

### v0.3

* Admin สามารถเลือก user และตอบกลับข้อความได้

### v0.2

* รับข้อความจาก LINE OA ผ่าน webhook

### v0.1

* ส่งข้อความจาก webchat ไปยัง LINE OA