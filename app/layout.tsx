import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oncure — AI Health Screening",
  description: "Premium AI-powered health screening platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#111318] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
