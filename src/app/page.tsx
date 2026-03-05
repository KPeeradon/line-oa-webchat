"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

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
      const res = await fetch(`/api/messages?userId=${selectedUser}`);
      const data = await res.json();
      setMessages(data);
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
        userId: selectedUser,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* User list */}
      <div className="w-64 border-r border-gray-700 p-4">
        <h2 className="font-bold mb-4">Users</h2>

        {users.map((u) => (
          <div
            key={u}
            onClick={() => setSelectedUser(u)}
            className={`p-2 cursor-pointer rounded ${
              selectedUser === u ? "bg-green-600" : "bg-gray-800"
            }`}
          >
            {u.slice(0, 10)}...
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="flex flex-col flex-1">
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
        </div>

        {selectedUser && (
          <div className="p-4 border-t border-gray-700 flex gap-2">
            <input
              className="flex-1 p-2 rounded bg-gray-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
