"use client";
import { useEffect } from "react";
import { useChat, type UseChatOptions } from "@ai-sdk/react";
import { Chat } from "@/components/chatbot-ui/chat";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatDemo(props: ChatDemoProps) {
  const {
    messages = [],
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    status,
  } = useChat({
    ...props,
    api: "/api/chat",
  });

  useEffect(() => {
    console.log("🔍 Wiadomości z useChat:", messages);
  }, [messages]);

  useEffect(() => {
    console.log("💡 Status czatu:", status);
  }, [status]);


  const convertedMessages = messages.map((message) => {
    const validParts = message.parts?.filter(
      (part): part is { type: "text"; text: string } =>
        part.type === "text" && typeof (part as any).text === "string"
    );
  
    if (validParts && validParts.length > 0) {
      return {
        ...message,
        parts: validParts,
      };
    }
  
    if (message.role === "assistant" && typeof message.content === "string") {
      return {
        ...message,
        parts: [
          {
            type: "text",
            text: message.content,
          } as const, // 👈 to klucz do poprawnego literału
        ],
      };
    }
  
    return {
      ...message,
      parts: [],
    };
  });
  

  useEffect(() => {
    console.log("🔍 Wiadomości po konwersji:", convertedMessages);
  }, [convertedMessages]);

  return (
    <div className="flex h-[500px] w-full">
      <Chat
        className="grow"
        messages={convertedMessages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={status === "streaming"}
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
