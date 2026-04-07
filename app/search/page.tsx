"use client";
import { useState } from "react";
import { Search, FileText, Pill, Stethoscope, Brain, Clock } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const recentSearches = ["TSH", "Levothyroxine", "Dr. Priya Menon", "Vitamin D"];

const results = {
  Reports: [
    { label: "Thyroid Panel — Apr 5, 2025", sub: "Dr. Lal PathLabs · 2 out of range", href: "/reports/thyroid-apr-2025", color: "#D4A847" },
    { label: "Lipid Profile — Mar 28, 2025", sub: "Thyrocare · 2 out of range", href: "/reports/lipid-mar-2025", color: "#D4A847" },
  ],
  Medicines: [
    { label: "Levothyroxine 50 mcg", sub: "Once daily · Dr. Priya Menon", href: "/medicines/levothyroxine", color: "#9A7EC0" },
  ],
  Doctors: [
    { label: "Dr. Priya Menon", sub: "Endocrinologist · AIIMS", href: "/visits/v1", color: "#5A8AC0" },
  ],
  Insights: [
    { label: "TSH Normalization by July 2025", sub: "AI Prediction · Apr 7", href: "/ai", color: "#D4A847" },
  ],
};

const ICONS: Record<string, React.ElementType> = {
  Reports: FileText,
  Medicines: Pill,
  Doctors: Stethoscope,
  Insights: Brain,
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const hasResults = query.length > 1;

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>GLOBAL</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Search</h1>
      </div>

      {/* Search input */}
      <div className="px-[22px] mb-5">
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-[12px]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
          <Search size={16} color="#444" strokeWidth={1.5} />
          <input
            className="flex-1 bg-transparent text-[14px] text-white placeholder-[#333] outline-none"
            placeholder="Reports, medicines, doctors..."
            value={query} onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {!hasResults ? (
        <div className="px-[22px]">
          <SectionLabel>RECENT SEARCHES</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button key={s} onClick={() => setQuery(s)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-[11px] font-600 text-[#888]"
                style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
                <Clock size={10} strokeWidth={1.5} /> {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-[22px] space-y-5">
          {Object.entries(results).map(([category, items]) => {
            const Icon = ICONS[category];
            return (
              <div key={category}>
                <SectionLabel>{category.toUpperCase()}</SectionLabel>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <div className="card flex items-center gap-3 py-3 px-4">
                        <Icon size={14} strokeWidth={1.5} style={{ color: item.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-600 text-white truncate">{item.label}</p>
                          <p className="text-[10px] text-[#444] mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
