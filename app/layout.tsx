import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirmal Nipuna Nanayakkara | Career Assistant",
  description:
    "A personal assistant for learning about Nirmal Nipuna Nanayakkara's CV, career, projects, and technical skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
