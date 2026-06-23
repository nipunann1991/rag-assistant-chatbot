"use client";

import { useEffect, useRef, useState } from "react";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

const apiEndpoint = "/api/response";
const fallbackResponse =
  "I could not get a response right now. Please try asking again.";

const suggestions = [
  "Tell me about Nirmal's experience",
  "What projects has Nirmal worked on?",
  "What are Nirmal's strongest technical skills?",
  "Why should we hire Nirmal?",
];

function createMessage(
  role: ChatMessageType["role"],
  content: string,
): ChatMessageType {
  return {
    id: `${role}-${Date.now()}-${crypto.randomUUID()}`,
    role,
    content,
  };
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function getAssistantResponse(content: string) {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: content }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "answer" in data &&
      typeof data.answer === "string"
    ) {
      return data.answer;
    }

    throw new Error("Response did not include an answer.");
  }

  async function handleSendMessage(content: string) {
    if (isLoading) return;

    const userMessage = createMessage("user", content);
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsLoading(true);

    try {
      const answer = await getAssistantResponse(content);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", answer),
      ]);
    } catch (error) {
      console.error(error);
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", fallbackResponse),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleBackHome() {
    if (isLoading) return;
    setMessages([]);
  }

  return (
    <section className="flex flex-1 flex-col justify-end gap-7 pb-2 sm:gap-9">
      {hasMessages ? (
        <div className="fixed left-4 top-6 z-20 sm:left-6 lg:left-[calc(50%-440px)]">
          <button
            type="button"
            onClick={handleBackHome}
            disabled={isLoading}
            aria-label="Back to Home"
            className="group inline-flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/78 text-[#56635f] shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#cfded9] hover:bg-white hover:text-[#111f1b] disabled:cursor-wait disabled:opacity-60"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col justify-center pt-8">
        {!hasMessages ? (
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="mb-28 flex flex-col items-center text-center max-sm:mb-16">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/72 px-3 py-1.5 text-xs font-semibold text-[#47615c] shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="size-2 rounded-full bg-[#14b88a]" />
                Personal career assistant
              </div>
              <h1 className="max-w-2xl text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#101312] sm:text-[46px]">
                Meet the talent behind the CV.
              </h1>
              <p className="mt-4 max-w-xl font-sans text-sm font-medium leading-6 text-[#6d7471] sm:text-[15px]">
                👋 Hi! I&apos;m Nirmal Nipuna Nanayakkara&apos;s AI assistant. How
                can I help you today?
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isLoading}
                  className="group min-h-12 rounded-xl border border-white/80 bg-white/78 px-4 py-2.5 text-left text-xs font-semibold leading-5 text-[#929795] shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#cfded9] hover:bg-white hover:text-[#25302d] hover:shadow-[0_16px_38px_rgba(15,23,42,0.08)] disabled:cursor-wait disabled:opacity-60 sm:min-h-14 sm:rounded-2xl sm:px-5 sm:text-[13px]"
                >
                  <span className="flex items-center justify-between gap-4 font-sans">
                    {suggestion}
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f0f4f2] text-[#8a9691] transition group-hover:bg-[#13211d] group-hover:text-white sm:size-7">
                      <svg
                        aria-hidden="true"
                        className="size-3 sm:size-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 17 17 7m0 0H9m8 0v8"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-h-[calc(100vh-15rem)] w-full flex-col gap-4 overflow-y-auto rounded-[24px] py-4 sm:p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading ? (
              <ChatMessage
                message={{
                  id: "assistant-loading",
                  role: "assistant",
                  content: "Thinking...",
                }}
              />
            ) : null}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput isLoading={isLoading} onSendMessage={handleSendMessage} />
    </section>
  );
}
