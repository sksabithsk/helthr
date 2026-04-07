"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const commonSymptoms = [
  "Fatigue", "Headache", "Nausea", "Joint Pain", "Muscle Aches", "Dizziness",
  "Shortness of Breath", "Chest Pain", "Palpitations", "Brain Fog",
  "Cold Intolerance", "Hair Loss", "Weight Change", "Sleep Issues",
];

const severityLabels = ["Mild", "Moderate", "Severe", "Debilitating"];
const severityColors = ["#4D8B3B", "#D4A847", "#F59E0B", "#EF4444"];

const patterns = [
  { symptom: "Fatigue", insight: "Correlates with TSH elevation — both trending together since Sep 2024", color: "#9A7EC0" },
  { symptom: "Cold intolerance", insight: "Classic hypothyroid symptom — consistent with TSH 7.8", color: "#5A8AC0" },
];

export default function SymptomsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["Fatigue", "Cold Intolerance"]);
  const [severity, setSeverity] = useState(1);
  const [time, setTime] = useState("09:00");
  const [note, setNote] = useState("");

  const filtered = commonSymptoms.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase()) && !selected.includes(s)
  );

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Symptom Logger" subtitle="Track patterns over time" />

      {/* Selected */}
      {selected.length > 0 && (
        <div className="px-[22px] mb-4">
          <div className="flex flex-wrap gap-2">
            {selected.map((s) => (
              <button key={s}
                onClick={() => setSelected((p) => p.filter((x) => x !== s))}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] text-[11px] font-600"
                style={{ background: "rgba(212,168,71,0.1)", color: "#D4A847", border: "0.5px solid rgba(212,168,71,0.3)" }}>
                {s} <X size={10} strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="px-[22px] mb-4">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
          <Search size={14} color="#444" strokeWidth={1.5} />
          <input className="flex-1 bg-transparent text-[13px] text-white placeholder-[#333] outline-none"
            placeholder="Search or add symptom..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Common symptoms */}
      <div className="px-[22px] mb-5">
        <SectionLabel>COMMON SYMPTOMS</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {(search ? filtered : commonSymptoms.filter((s) => !selected.includes(s))).map((s) => (
            <button key={s}
              onClick={() => setSelected((p) => [...p, s])}
              className="pill text-[#888] transition-all hover:text-[#D4A847]">
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Severity */}
      <div className="px-[22px] mb-5">
        <SectionLabel>SEVERITY</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {severityLabels.map((l, i) => (
            <button key={l} onClick={() => setSeverity(i)}
              className="py-2 rounded-[8px] text-[11px] font-600 transition-all"
              style={{
                background: severity === i ? `${severityColors[i]}15` : "#0A0908",
                color: severity === i ? severityColors[i] : "#555",
                border: severity === i ? `0.5px solid ${severityColors[i]}40` : "0.5px solid #1A1710",
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Time + note */}
      <div className="px-[22px] mb-5 space-y-3">
        <div>
          <p className="section-label mb-2">TIME OF OCCURRENCE</p>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className="px-3.5 py-2.5 rounded-[10px] text-[13px] text-white mono outline-none"
            style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }} />
        </div>
        <div>
          <p className="section-label mb-2">NOTES</p>
          <textarea
            className="w-full px-3.5 py-2.5 rounded-[10px] text-[13px] text-white outline-none resize-none placeholder-[#333]"
            style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}
            placeholder="Additional context..."
            rows={2}
            value={note} onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      {/* Pattern insights */}
      {patterns.length > 0 && (
        <div className="px-[22px] mb-5">
          <SectionLabel>AI PATTERN INSIGHTS</SectionLabel>
          <div className="space-y-2">
            {patterns.map((p) => (
              <div key={p.symptom} className="alert-card" style={{ borderLeft: `2px solid ${p.color}` }}>
                <p className="text-[11px] font-700" style={{ color: p.color }}>{p.symptom}</p>
                <p className="text-[11px] text-[#555] mt-0.5">{p.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-[22px]">
        <button className="w-full py-3.5 rounded-[10px] text-[14px] font-700 text-black"
          style={{ background: "#D4A847" }}>
          Log Symptoms
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
