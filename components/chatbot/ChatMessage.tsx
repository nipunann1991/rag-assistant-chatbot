import type { ChatMessage as ChatMessageType } from "@/types/chat";

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-5 py-3 text-sm font-medium leading-relaxed shadow-[0_10px_28px_rgba(15,23,42,0.06)] ${
          isUser
            ? "bg-[#111f1b] text-white"
            : "bg-white text-[#58615e]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
