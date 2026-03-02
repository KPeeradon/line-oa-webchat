"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "oa"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    const currentMessage = message;

    setMessages((prev) => [...prev, { role: "user", text: currentMessage }]);

    setMessage("");

    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentMessage }),
    });

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl flex flex-col shadow-2xl border border-gray-700">
        <div className="bg-green-600 text-center py-4 font-semibold rounded-t-2xl">
          LINE OA Web Chat
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-xl w-fit max-w-xs text-sm shadow ${
                msg.role === "user"
                  ? "bg-green-500 ml-auto"
                  : "bg-gray-600 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-4 border-t border-gray-700">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-700 rounded-xl px-3 py-2"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-green-600 px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
