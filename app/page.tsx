"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import ChatRoom from "@/components/ChatRoom";

export default function Home() {
  const [user, setUser] = useState<{ name: string; location: string; groupId: string } | null>(null);

  const handleLogin = (userData: { name: string; location: string; groupId: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatRoom user={user} onLogout={handleLogout} />
      )}
    </main>
  );
}
