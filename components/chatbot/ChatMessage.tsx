import type { ChatMessage as ChatMessageType } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            : "border border-white/80 bg-white/92 text-[#58615e]"
        }`}
      >
        {isUser ? (
          <span className="font-sans">{message.content}</span>
        ) : (
         <div
          className="prose prose-sm max-w-none space-y-4 font-sans text-[#35413d]

            prose-headings:font-bold prose-headings:text-[#111f1b]

            prose-h1:text-3xl prose-h1:mt-6 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:mt-5 prose-h2:mb-3
            prose-h3:text-[17px] prose-h3:font-bold prose-h3:mt-5 prose-h3:mb-3
            prose-h4:text-base prose-h4:font-bold prose-h4:mt-4 prose-h4:mb-2
            prose-h5:text-sm prose-h5:font-bold prose-h5:mt-4 prose-h5:mb-2
            prose-h6:text-sm prose-h6:font-bold prose-h6:mt-4 prose-h6:mb-2 
            prose-p:my-2
            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
            prose-li:my-1 prose-li:marker:text-[#14b88a]

            prose-a:font-bold prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
            prose-strong:font-bold prose-strong:text-[#111f1b]"
        >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ children, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}