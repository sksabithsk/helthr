"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Brain, Activity, Pill } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/reports", icon: FileText, label: "Reports" },
  { href: "/interactions", icon: Brain, label: "Insights" },
  { href: "/pregnancy", icon: Activity, label: "Tracker" },
  { href: "/medications", icon: Pill, label: "Meds" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50">
      <div
        className="mx-3 mb-3 rounded-2xl flex items-center justify-around py-2 px-1"
        style={{
          background: "rgba(26, 29, 37, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
              style={{
                background: active ? "rgba(0, 212, 180, 0.12)" : "transparent",
              }}
            >
              <Icon
                size={20}
                style={{ color: active ? "#00D4B4" : "rgba(255,255,255,0.4)" }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? "#00D4B4" : "rgba(255,255,255,0.4)" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
