"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    loadUsers();
    const interval = setInterval(loadUsers, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      const res = await fetch(`/api/messages?userId=${selectedUser.userId}`);
      const data = await res.json();
      setMessages(data);
      setTimeout(scrollBottom, 100);
    };

    loadMessages();

    const interval = setInterval(loadMessages, 2000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!message || !selectedUser) return;

    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: selectedUser.userId,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* User list */}
      <div className="w-72 border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Users</h2>

        {users.map((u) => {
          const online = Date.now() - u.lastActive < 60000;

          return (
            <div
              key={u.userId}
              onClick={() => setSelectedUser(u)}
              className={`p-3 rounded cursor-pointer mb-2 flex justify-between items-center ${
                selectedUser?.userId === u.userId
                  ? "bg-green-600"
                  : "bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    online ? "bg-green-400" : "bg-gray-500"
                  }`}
                ></span>

                {u.name}
              </div>

              {u.unread > 0 && (
                <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                  {u.unread}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b border-gray-700 font-semibold">
          {selectedUser ? selectedUser.name : "Select user"}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded ${
                m.role === "admin" ? "bg-green-500 ml-auto" : "bg-gray-600"
              }`}
            >
              {m.text}
            </div>
          ))}

          <div ref={bottomRef}></div>
        </div>

        {selectedUser && (
          <div className="p-4 border-t border-gray-700 flex gap-2">
            <input
              className="flex-1 p-2 rounded bg-gray-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage} className="bg-green-600 px-4 rounded">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
