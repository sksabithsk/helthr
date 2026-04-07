import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Helthr — Family Health Companion",
  description: "AI-powered family health tracking, lab analysis and doctor coordination",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="mobile-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
