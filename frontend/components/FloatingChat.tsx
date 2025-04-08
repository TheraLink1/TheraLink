"use client";

import { useState } from "react";
import { ChatDemo } from "@/components/chat-demo";
import { X, MessageCircle } from "lucide-react";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
        aria-label="Open chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat window */}
      {isOpen && (
  <div className="fixed bottom-20 right-6 z-40 w-[350px] max-h-[500px] shadow-xl rounded-xl overflow-hidden bg-white border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 p-3">
    <ChatDemo />
  </div>
)}


    </>
  );
}
