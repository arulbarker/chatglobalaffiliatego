"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "@/types";
import { sendMessage, subscribeToMessages } from "@/lib/chatService";
import { getGroupInfo } from "@/lib/groupService";

interface ChatRoomProps {
  user: {
    name: string;
    location: string;
    groupId: string;
  };
  onLogout: () => void;
}

export default function ChatRoom({ user, onLogout }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [groupInfo, setGroupInfo] = useState<{ location: string; memberCount: number } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load group info
    getGroupInfo(user.groupId).then((info) => {
      if (info) {
        setGroupInfo({
          location: info.location,
          memberCount: info.memberCount,
        });
      }
    });

    // Subscribe to messages
    const unsubscribe = subscribeToMessages(user.groupId, (newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [user.groupId]);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || isSending) {
      return;
    }

    setIsSending(true);

    try {
      await sendMessage(user.groupId, user.name, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-t-2xl px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{groupInfo?.location || user.location}</h2>
          <p className="text-blue-100 text-sm">
            {groupInfo?.memberCount || 1} anggota • Anda: {user.name}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition font-medium"
        >
          Keluar
        </button>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">Belum ada pesan</p>
              <p className="text-sm">Jadilah yang pertama mengirim pesan!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.userName === user.name;

            return (
              <div
                key={message.id}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  } rounded-2xl px-4 py-3 shadow-sm`}
                >
                  {!isOwnMessage && (
                    <p className="text-xs font-semibold mb-1 text-blue-600">
                      {message.userName}
                    </p>
                  )}
                  <p className="break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 bg-white rounded-b-2xl"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Kirim"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
