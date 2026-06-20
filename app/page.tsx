import { ChatWindow } from "@/components/chatbot/ChatWindow";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7f5] px-4 py-8 text-[#101312] sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_28%_18%,rgba(25,135,112,0.16),transparent_34%),radial-gradient(circle_at_72%_10%,rgba(66,133,244,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.72))]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[880px] flex-col">
        <ChatWindow />
      </div>
    </main>
  );
}
