"use client";
import { useState } from "react";
import { MessageSquare, TrendingUp, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

type FilterType = "All" | "Trends" | "Predictions" | "Alerts" | "Tips";

const insights = [
  {
    id: 1, category: "Prediction", color: "#D4A847",
    title: "TSH Normalization by July 2025",
    body: "With consistent Levothyroxine 50 mcg therapy, your TSH is projected to normalize by July 2025. Your T4 levels should follow 4–6 weeks after.",
    data: "TSH: 7.8 → 4.0 mIU/L", date: "Apr 7",
    type: "Predictions",
  },
  {
    id: 2, category: "Alert", color: "#EF4444",
    title: "Lipid-Thyroid Cascade Detected",
    body: "Your elevated TSH is impairing lipid metabolism, causing your LDL and Triglycerides to rise. Treating hypothyroidism should normalize lipids without statins.",
    data: "LDL: 142 · TG: 178 mg/dL", date: "Apr 6",
    type: "Alerts",
  },
  {
    id: 3, category: "Trend", color: "#5A8AC0",
    title: "Vitamin D Declining for 8 Months",
    body: "Vitamin D has dropped steadily from 28 ng/mL (Jun 2024) to 18.4 ng/mL. Current 2000 IU supplementation is insufficient — consider increasing to 4000 IU.",
    data: "28 → 18.4 ng/mL over 8 months", date: "Apr 5",
    type: "Trends",
  },
  {
    id: 4, category: "Tip", color: "#4D8B3B",
    title: "Take Levothyroxine on Empty Stomach",
    body: "Taking Levothyroxine 30–60 minutes before breakfast increases absorption by 20–30%. Avoid calcium, iron and coffee for 4 hours after.",
    data: "+20–30% bioavailability", date: "Apr 5",
    type: "Tips",
  },
  {
    id: 5, category: "Prediction", color: "#D4A847",
    title: "HbA1c May Cross Diabetic Range by 2026",
    body: "Your HbA1c has risen from 5.4% to 5.9% over 8 months. Without intervention, it's predicted to reach 6.5% (diabetic) by mid-2026.",
    data: "5.4 → 5.9% · +0.5% in 8 months", date: "Apr 4",
    type: "Predictions",
  },
  {
    id: 6, category: "Tip", color: "#4D8B3B",
    title: "30-min Walk Reduces TG by ~18%",
    body: "Studies show moderate daily walking reduces Triglycerides by 15–20% over 8 weeks. Combined with Omega-3, your TG could normalize by August.",
    data: "178 → ~146 mg/dL (projected)", date: "Apr 3",
    type: "Tips",
  },
];

const filters: FilterType[] = ["All", "Trends", "Predictions", "Alerts", "Tips"];

export default function AIPage() {
  const [filter, setFilter] = useState<FilterType>("All");
  const filtered = filter === "All" ? insights : insights.filter((i) => i.type === filter);

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4 flex items-end justify-between">
        <div>
          <p className="section-label" style={{ letterSpacing: "2px" }}>HELTHR</p>
          <h1 className="text-[22px] font-700 text-white mt-1">AI Intelligence</h1>
        </div>
        <Link href="/ai/prep">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-[8px]"
            style={{ background: "rgba(212,168,71,0.1)", border: "0.5px solid rgba(212,168,71,0.2)" }}>
            <MessageSquare size={13} color="#D4A847" strokeWidth={1.5} />
            <span className="text-[11px] font-600 text-[#D4A847]">Ask AI</span>
          </div>
        </Link>
      </div>

      {/* Filter chips */}
      <div className="px-[22px] mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-600 transition-all"
            style={{
              background: filter === f ? "rgba(212,168,71,0.1)" : "transparent",
              color: filter === f ? "#D4A847" : "#555",
              border: `0.5px solid ${filter === f ? "rgba(212,168,71,0.3)" : "#1A1710"}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Insights feed */}
      <div className="px-[22px] space-y-3">
        {filtered.map((ins) => (
          <div key={ins.id} className="card" style={{ borderLeft: `2px solid ${ins.color}` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-700 tracking-[1.5px] uppercase" style={{ color: ins.color }}>
                {ins.category}
              </span>
              <span className="mono text-[10px] text-[#333]">{ins.date}</span>
            </div>
            <p className="text-[13px] font-700 text-white mb-1.5">{ins.title}</p>
            <p className="text-[12px] text-[#888] leading-relaxed mb-2">{ins.body}</p>
            <div className="flex items-center justify-between">
              <span className="mono text-[10px]" style={{ color: ins.color }}>{ins.data}</span>
              {ins.type === "Predictions" && (
                <Link href="/ai/projections">
                  <span className="text-[10px] text-[#D4A847]">View projection →</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pre-consult CTA */}
      <div className="mx-[22px] mt-5">
        <Link href="/ai/prep">
          <div className="card flex items-center gap-4" style={{ borderLeft: "2px solid #5A8AC0" }}>
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(90,138,192,0.1)" }}>
              <MessageSquare size={18} color="#5A8AC0" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-600 text-white">Pre-Consultation Prep</p>
              <p className="text-[11px] text-[#444] mt-0.5">AI prepares talking points for your doctor visit</p>
            </div>
            <ChevronRight size={13} color="#333" strokeWidth={1.5} />
          </div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
