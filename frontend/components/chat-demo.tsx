"use client";

import { useChat, type UseChatOptions } from "ai/react";

import { Chat } from "@/components/chatbot-ui/chat";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatDemo(props: ChatDemoProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat(props);

  return (
    <div className="flex h-[500px] w-full">
      <Chat
        className="grow"
        messages={messages.map((message) => ({
          ...message,
          parts: message.parts.filter((part) => part.type === "source" || part.type === "text"),
        }))}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "Jak mogę umówić wizytę z psychologiem?",
          "Jaki specjalista będzie odpowiedni dla mnie?",
          "Czy rozmowy z terapeutą są poufne?",
        ]}
      />
    </div>
  );
}
      
      