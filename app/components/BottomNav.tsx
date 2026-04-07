"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill={active ? "#D4A847" : "none"}
        stroke={active ? "#D4A847" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: "/timeline",
    label: "Timeline",
    icon: (active: boolean) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#D4A847" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    href: "/ai",
    label: "AI",
    icon: (active: boolean) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#D4A847" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 015 5v2a5 5 0 01-10 0V7a5 5 0 015-5z"/>
        <path d="M2 17c0-3.3 4.5-6 10-6s10 2.7 10 6"/>
        <circle cx="12" cy="7" r="1.5" fill={active ? "#D4A847" : "#555"} stroke="none"/>
      </svg>
    ),
  },
  {
    href: "/family",
    label: "Family",
    icon: (active: boolean) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#D4A847" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    href: "/reports",
    label: "Records",
    icon: (active: boolean) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
        stroke={active ? "#D4A847" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="12" y2="17"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabs.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg min-w-[52px]">
              {icon(active)}
              <span className={`text-[8px] font-semibold tracking-wide ${active ? "text-[#D4A847]" : "text-[#555]"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
