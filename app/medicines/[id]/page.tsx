"use client";
import { useParams } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";
import ProgressBar from "../../components/ProgressBar";

const medData: Record<string, {
  name: string; dose: string; form: string; freq: string; doctor: string;
  startDate: string; adherence: number; streak: number; daysLeft: number;
  color: string; calendar: Record<string, "taken"|"missed"|"future">;
}> = {
  "levothyroxine": {
    name: "Levothyroxine", dose: "50 mcg", form: "Tablet", freq: "Once daily, morning",
    doctor: "Dr. Priya Menon", startDate: "Apr 2, 2025",
    adherence: 85, streak: 5, daysLeft: 22, color: "#9A7EC0",
    calendar: {
      "1": "taken", "2": "taken", "3": "missed", "4": "taken", "5": "taken",
      "6": "taken", "7": "taken", "8": "future", "9": "future", "10": "future",
    },
  },
  "vitamin-d3": {
    name: "Vitamin D3", dose: "2000 IU", form: "Capsule", freq: "Once daily, with food",
    doctor: "AI Recommended", startDate: "Feb 15, 2025",
    adherence: 92, streak: 12, daysLeft: 45, color: "#D4A847",
    calendar: {
      "1": "taken", "2": "taken", "3": "taken", "4": "taken", "5": "taken",
      "6": "taken", "7": "taken", "8": "future", "9": "future", "10": "future",
    },
  },
};

export default function MedicineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const med = medData[id] ?? medData["vitamin-d3"];

  const days = Array.from({ length: 30 }, (_, i) => String(i + 1));

  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title={med.name} subtitle={`${med.dose} · ${med.form}`}
        action={
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-[8px] flex items-center justify-center"
              style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
              <Edit2 size={13} color="#888" strokeWidth={1.5} />
            </button>
          </div>
        }
      />

      {/* Info card */}
      <div className="mx-[22px] mb-5 card">
        <div className="grid grid-cols-2 gap-y-3">
          {[
            { label: "FREQUENCY", value: med.freq },
            { label: "DOCTOR", value: med.doctor },
            { label: "SINCE", value: med.startDate },
            { label: "SUPPLY LEFT", value: `${med.daysLeft} days` },
          ].map((item) => (
            <div key={item.label}>
              <p className="section-label" style={{ fontSize: 8 }}>{item.label}</p>
              <p className="text-[12px] font-600 text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Adherence stats */}
      <div className="px-[22px] mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "ADHERENCE", value: `${med.adherence}%`, color: med.color },
          { label: "STREAK", value: `${med.streak}d 🔥`, color: "#D4A847" },
          { label: "REFILL IN", value: `${med.daysLeft}d`, color: "#888" },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className="mono text-[18px] font-700" style={{ color: s.color }}>{s.value}</p>
            <p className="section-label mt-0.5" style={{ fontSize: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Adherence bar */}
      <div className="px-[22px] mb-5">
        <div className="card">
          <ProgressBar label="MONTHLY ADHERENCE" value={med.adherence} color={med.color} />
        </div>
      </div>

      {/* Calendar */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ADHERENCE CALENDAR — APRIL</SectionLabel>
        <div className="card">
          <div className="grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
              <div key={d} className="text-center text-[9px] text-[#333] font-600 pb-1">{d}</div>
            ))}
            {days.map((d) => {
              const status = med.calendar[d] ?? (parseInt(d) > 7 ? "future" : "taken");
              return (
                <div key={d}
                  className="aspect-square rounded-[4px] flex items-center justify-center text-[10px] font-600 mono"
                  style={{
                    background: status === "taken" ? med.color + "20" : status === "missed" ? "rgba(239,68,68,0.12)" : "#0A0908",
                    color: status === "taken" ? med.color : status === "missed" ? "#EF4444" : "#333",
                    border: status === "future" ? "0.5px solid #111" : "none",
                  }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            {[{ color: med.color, label: "Taken" }, { color: "#EF4444", label: "Missed" }, { color: "#333", label: "Future" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px]" style={{ background: l.color + "30", border: `0.5px solid ${l.color}` }} />
                <span className="text-[10px] text-[#555]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-[22px] mb-5 flex gap-3">
        <button className="flex-1 py-3 rounded-[10px] text-[13px] font-600 text-white"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
          Edit Medication
        </button>
        <button className="flex-1 py-3 rounded-[10px] text-[13px] font-600"
          style={{ background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.2)", color: "#EF4444" }}>
          Discontinue
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
