"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // focus ตอนเข้าเว็บครั้งแรก
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    // await fetch("/api/send", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message }),
    // });

    setMessages((prev) => [...prev, message]);
    setMessage("");
    setLoading(false);

    // focus กลับหลังส่งเสร็จ
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl flex flex-col border border-gray-700">
        {/* Header */}
        <div className="bg-green-600 text-white text-center py-4 rounded-t-2xl font-semibold text-lg">
          LINE OA Web Chat
        </div>

        {/* Chat Box */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto h-96">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm text-center">
              Start a conversation...
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-4 py-2 rounded-xl w-fit max-w-xs ml-auto text-sm shadow"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 p-4 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl disabled:opacity-50 transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
