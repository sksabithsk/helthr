"use client";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";
import MiniChart from "../../components/MiniChart";

const projections = [
  {
    name: "TSH", current: 7.8, target: 2.5, unit: "mIU/L", color: "#9A7EC0",
    weeks: 12, factors: ["Levothyroxine 50 mcg", "Consistent timing", "No calcium interference"],
    confidence: 82,
    data: [
      { label: "Now", value: 7.8 }, { label: "W3", value: 6.5 }, { label: "W6", value: 5.2 },
      { label: "W8", value: 4.1 }, { label: "W10", value: 3.2 }, { label: "W12", value: 2.5 },
    ],
    refLine: 4.0,
  },
  {
    name: "Vitamin D", current: 18.4, target: 45, unit: "ng/mL", color: "#D4A847",
    weeks: 10, factors: ["Vitamin D3 4000 IU", "Daily sunlight 20 min", "Magnesium co-factor"],
    confidence: 78,
    data: [
      { label: "Now", value: 18.4 }, { label: "W2", value: 22 }, { label: "W4", value: 29 },
      { label: "W6", value: 36 }, { label: "W8", value: 41 }, { label: "W10", value: 45 },
    ],
    refLine: 30,
  },
  {
    name: "Triglycerides", current: 178, target: 140, unit: "mg/dL", color: "#5A8AC0",
    weeks: 8, factors: ["Omega-3 1000 mg BD", "Thyroid treatment", "30 min daily walk"],
    confidence: 71,
    data: [
      { label: "Now", value: 178 }, { label: "W2", value: 170 }, { label: "W4", value: 162 },
      { label: "W6", value: 152 }, { label: "W8", value: 140 },
    ],
    refLine: 150,
  },
];

export default function ProjectionsPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="AI Projections" subtitle="Expected recovery timelines" />

      <div className="px-[22px] space-y-5">
        {projections.map((p) => (
          <div key={p.name}>
            <SectionLabel>{p.name.toUpperCase()} PROJECTION</SectionLabel>
            <div className="card">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="section-label mb-1">CURRENT → TARGET</p>
                  <div className="flex items-baseline gap-2">
                    <span className="mono text-[24px] font-700 text-[#EF4444]">{p.current}</span>
                    <span className="text-[#444] text-[12px]">→</span>
                    <span className="mono text-[24px] font-700 text-[#4D8B3B]">{p.target}</span>
                    <span className="text-[11px] text-[#444]">{p.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="section-label mb-1">CONFIDENCE</p>
                  <p className="mono text-[18px] font-700" style={{ color: p.color }}>{p.confidence}%</p>
                </div>
              </div>
              <MiniChart data={p.data} color={p.color} height={110} refLine={p.refLine} />
              <div className="mt-3 pt-3" style={{ borderTop: "0.5px solid #111" }}>
                <p className="section-label mb-2">FACTORS CONSIDERED</p>
                <div className="space-y-1.5">
                  {p.factors.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      <p className="text-[11px] text-[#888]">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-[#333] mt-3 leading-relaxed">
                Projection assumes consistent adherence. Individual results may vary. Not a substitute for medical advice.
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
