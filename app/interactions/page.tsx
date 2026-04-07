"use client";
import { useState } from "react";
import { ArrowLeft, Zap, AlertTriangle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/app/components/BottomNav";
import StatusBar from "@/app/components/StatusBar";

const interactions = [
  {
    id: 1,
    paramA: "Triglycerides",
    paramB: "LDL",
    severity: "high",
    colorA: "#F59E0B",
    colorB: "#EF4444",
    relation: "Synergistic Risk",
    description:
      "Elevated Triglycerides and LDL together significantly increase cardiovascular risk. Your combined lipid score is in the high-risk zone.",
    valueA: "178 mg/dL",
    valueB: "142 mg/dL",
    action: "Statin therapy + dietary changes",
    category: "Cardiovascular",
  },
  {
    id: 2,
    paramA: "BMI",
    paramB: "Knee Pain",
    severity: "moderate",
    colorA: "#F59E0B",
    colorB: "#F59E0B",
    relation: "Mechanical Load",
    description:
      "Every 1 kg/m² increase in BMI adds ~4kg load on knee joints. Weight reduction can significantly alleviate symptoms.",
    valueA: "27.4 kg/m²",
    valueB: "Bilateral",
    action: "Weight management program",
    category: "Musculoskeletal",
  },
  {
    id: 3,
    paramA: "TSH",
    paramB: "Cholesterol",
    severity: "high",
    colorA: "#EF4444",
    colorB: "#F59E0B",
    relation: "Hormonal Cascade",
    description:
      "Hypothyroidism (elevated TSH) directly impairs lipid metabolism, causing cholesterol accumulation. Treating thyroid is likely to normalize lipids.",
    valueA: "7.8 mIU/L",
    valueB: "214 mg/dL",
    action: "Thyroid treatment first",
    category: "Endocrine → Metabolic",
  },
  {
    id: 4,
    paramA: "Uric Acid",
    paramB: "Renal Calculi",
    severity: "moderate",
    colorA: "#F59E0B",
    colorB: "#F59E0B",
    relation: "Crystal Formation",
    description:
      "Hyperuricemia increases risk of urate kidney stones. Hydration and uricosuric agents can reduce recurrence significantly.",
    valueA: "7.2 mg/dL",
    valueB: "History: 1 episode",
    action: "Increase hydration, dietary purines ↓",
    category: "Renal",
  },
  {
    id: 5,
    paramA: "Vitamin D",
    paramB: "Bone Density",
    severity: "high",
    colorA: "#EF4444",
    colorB: "#EF4444",
    relation: "Direct Deficiency",
    description:
      "Vitamin D deficiency (18 ng/mL) severely impacts calcium absorption and bone mineralization. Risk of osteopenia in 6–12 months.",
    valueA: "18.4 ng/mL",
    valueB: "T-score: −1.2",
    action: "High-dose Vitamin D supplementation",
    category: "Bone Health",
  },
  {
    id: 6,
    paramA: "HbA1c",
    paramB: "Kidney Function",
    severity: "low",
    colorA: "#10B981",
    colorB: "#10B981",
    relation: "Monitoring Required",
    description:
      "Pre-diabetic HbA1c is within watch-range. Proactive lifestyle changes can prevent progression to diabetic nephropathy.",
    valueA: "5.9%",
    valueB: "eGFR: 92",
    action: "Lifestyle modification",
    category: "Metabolic → Renal",
  },
];

const severityConfig = {
  high: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "High Risk", border: "rgba(239,68,68,0.3)" },
  moderate: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "Moderate", border: "rgba(245,158,11,0.3)" },
  low: { color: "#10B981", bg: "rgba(16,185,129,0.12)", label: "Low", border: "rgba(16,185,129,0.3)" },
};

function InteractionCard({ item }: { item: typeof interactions[0] }) {
  const [expanded, setExpanded] = useState(false);
  const sc = severityConfig[item.severity as keyof typeof severityConfig];

  return (
    <button
      className="w-full text-left rounded-2xl p-4 transition-all"
      style={{ background: "#1A1D25", border: `1px solid ${expanded ? sc.border : "rgba(255,255,255,0.06)"}` }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Connection visual */}
        <div className="flex flex-col items-center pt-1 shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold"
            style={{ background: `${item.colorA}20`, color: item.colorA, border: `1px solid ${item.colorA}30` }}>
            {item.paramA.slice(0, 3).toUpperCase()}
          </div>
          <div className="w-0.5 h-4 my-1" style={{ background: `linear-gradient(${item.colorA}, ${item.colorB})` }} />
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold"
            style={{ background: `${item.colorB}20`, color: item.colorB, border: `1px solid ${item.colorB}30` }}>
            {item.paramB.slice(0, 3).toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Zap size={11} style={{ color: sc.color }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: sc.color }}>
                {item.relation}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: sc.bg, color: sc.color }}>
                {sc.label}
              </span>
              {expanded ? <ChevronUp size={13} className="text-white/30" /> : <ChevronDown size={13} className="text-white/30" />}
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[14px] font-bold text-white">{item.paramA}</span>
            <ArrowRight size={12} className="text-white/30" />
            <span className="text-[14px] font-bold text-white">{item.paramB}</span>
          </div>

          <p className="text-[10px] text-white/40 mt-0.5">{item.category}</p>

          {/* Values row */}
          <div className="flex gap-2 mt-2">
            <div className="flex-1 rounded-lg px-2 py-1.5"
              style={{ background: `${item.colorA}10` }}>
              <p className="text-[9px] text-white/40">{item.paramA}</p>
              <p className="text-[11px] font-bold" style={{ color: item.colorA }}>{item.valueA}</p>
            </div>
            <div className="flex-1 rounded-lg px-2 py-1.5"
              style={{ background: `${item.colorB}10` }}>
              <p className="text-[9px] text-white/40">{item.paramB}</p>
              <p className="text-[11px] font-bold" style={{ color: item.colorB }}>{item.valueB}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[12px] text-white/60 leading-relaxed">{item.description}</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl p-2.5"
            style={{ background: `${sc.color}10`, border: `1px solid ${sc.color}20` }}>
            <AlertTriangle size={13} style={{ color: sc.color }} />
            <p className="text-[11px] font-semibold" style={{ color: sc.color }}>
              Recommended: {item.action}
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

export default function InteractionsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "high" | "moderate" | "low">("all");

  const filtered = filter === "all"
    ? interactions
    : interactions.filter((i) => i.severity === filter);

  const counts = {
    high: interactions.filter((i) => i.severity === "high").length,
    moderate: interactions.filter((i) => i.severity === "moderate").length,
    low: interactions.filter((i) => i.severity === "low").length,
  };

  return (
    <div className="mobile-container overflow-x-hidden pb-28">
      <StatusBar />

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white/70" />
        </button>
        <div>
          <h1 className="text-[20px] font-bold text-white">Parameter Interactions</h1>
          <p className="text-[12px] text-white/40">Cross-parameter health relationships</p>
        </div>
      </div>

      {/* Summary row */}
      <div className="px-5 mb-5 grid grid-cols-3 gap-2.5">
        {[
          { key: "high", label: "High Risk", color: "#EF4444", bg: "rgba(239,68,68,0.1)", count: counts.high },
          { key: "moderate", label: "Moderate", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", count: counts.moderate },
          { key: "low", label: "Low Risk", color: "#10B981", bg: "rgba(16,185,129,0.1)", count: counts.low },
        ].map((item) => (
          <div key={item.key}
            className="rounded-xl p-3 text-center"
            style={{ background: item.bg, border: `1px solid ${item.color}30` }}>
            <div className="text-[24px] font-black" style={{ color: item.color }}>{item.count}</div>
            <div className="text-[10px] text-white/50 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All" },
          { key: "high", label: "High Risk" },
          { key: "moderate", label: "Moderate" },
          { key: "low", label: "Low" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all"
            style={{
              background: filter === key ? "#00D4B4" : "rgba(255,255,255,0.06)",
              color: filter === key ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Interaction Cards */}
      <div className="px-5 space-y-3">
        {filtered.map((item) => (
          <InteractionCard key={item.id} item={item} />
        ))}
      </div>

      {/* AI insight banner */}
      <div className="mx-5 mt-5 rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, rgba(0,212,180,0.1), rgba(124,58,237,0.1))", border: "1px solid rgba(0,212,180,0.2)" }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #00D4B4, #7C3AED)" }}>
            <Zap size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-white">AI Insight</p>
            <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
              3 of your 6 interactions are likely caused by the elevated TSH. Treating hypothyroidism may cascade-resolve multiple issues simultaneously.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
