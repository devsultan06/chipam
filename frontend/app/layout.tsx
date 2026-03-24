import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Chipam - No more drama over who paid.",
  description:
    "Chipam lets your group collect contributions, track payments, and send reminders — all in one place. Powered by Paystack.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <main className="min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
