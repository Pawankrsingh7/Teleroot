import type { Metadata } from "next";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "TeleSec Dashboard",
  description: "Cyber-security and network monitoring dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

