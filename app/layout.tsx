import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Daily Uplift - AI Quote Generator",
  description: "Get personalized uplifting quotes based on how you're feeling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
