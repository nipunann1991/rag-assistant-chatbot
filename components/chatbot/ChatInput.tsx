"use client";

import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

type ChatInputProps = {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
};

export function ChatInput({ isLoading, onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const canSend = message.trim().length > 0 && !isLoading;

  function sendMessage() {
    if (!canSend) return;
    onSendMessage(message.trim());
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-36 rounded-[24px] border border-white/80 bg-white/88 p-4 shadow-[0_20px_55px_rgba(15,23,42,0.1)] backdrop-blur"
    >
      <div className="flex h-full min-h-28 flex-col">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask about Nirmal's CV or career..."
          rows={3}
          className="min-h-16 flex-1 resize-none bg-transparent text-sm leading-6 text-[#171717] outline-none placeholder:text-[#a8afac] disabled:cursor-wait disabled:text-[#8d8d8d]"
        />

        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className="flex size-9 items-center justify-center rounded-full bg-[#edf1ef] text-[#b8c0bc] transition hover:bg-[#e1e8e5] enabled:bg-[#111f1b] enabled:text-white enabled:shadow-[0_10px_24px_rgba(17,31,27,0.22)] disabled:cursor-not-allowed"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 19V5m0 0-6 6m6-6 6 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
