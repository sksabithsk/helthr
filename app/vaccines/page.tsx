"use client";
import { useState } from "react";
import { Plus, CheckCircle, Clock, AlertCircle, ChevronRight, Syringe } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

type Tab = "Adult" | "Pediatric";

const adultVaccines = [
  { id: "v1", name: "Influenza", done: true, date: "Mar 20, 2025", next: "Mar 2026", overdue: false },
  { id: "v2", name: "COVID-19 Booster", done: true, date: "Jan 10, 2025", next: "Jan 2026", overdue: false },
  { id: "v3", name: "Tdap (Tetanus)", done: true, date: "Aug 5, 2022", next: "Aug 2032", overdue: false },
  { id: "v4", name: "Hepatitis B (3rd dose)", done: false, date: "", next: "Overdue", overdue: true },
  { id: "v5", name: "Pneumococcal (PPSV23)", done: false, date: "", next: "Due at 65+", overdue: false },
  { id: "v6", name: "HPV (3 doses)", done: false, date: "", next: "Not applicable", overdue: false },
];

const pediatricVaccines = [
  { id: "p1", name: "BCG", done: true, date: "Birth", next: "Done", overdue: false },
  { id: "p2", name: "OPV + IPV", done: true, date: "6 weeks", next: "Done", overdue: false },
  { id: "p3", name: "DPT", done: true, date: "6 weeks", next: "Done", overdue: false },
  { id: "p4", name: "MMR", done: true, date: "9 months", next: "Done", overdue: false },
  { id: "p5", name: "Varicella", done: false, date: "", next: "15 months — Due", overdue: true },
];

export default function VaccinesPage() {
  const [tab, setTab] = useState<Tab>("Adult");
  const vaccines = tab === "Adult" ? adultVaccines : pediatricVaccines;
  const done = vaccines.filter((v) => v.done).length;
  const overdue = vaccines.filter((v) => v.overdue).length;

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>IMMUNIZATION</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Vaccinations</h1>
      </div>

      {/* Tab toggle */}
      <div className="px-[22px] mb-5 flex gap-2">
        {(["Adult", "Pediatric"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2.5 rounded-[8px] text-[12px] font-600 transition-all"
            style={{
              background: tab === t ? "#D4A847" : "#0A0908",
              color: tab === t ? "#000" : "#555",
              border: tab === t ? "none" : "0.5px solid #1A1710",
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="px-[22px] mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "COMPLETED", value: String(done), color: "#4D8B3B" },
          { label: "PENDING", value: String(vaccines.length - done), color: "#888" },
          { label: "OVERDUE", value: String(overdue), color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className="mono text-[20px] font-700" style={{ color: s.color }}>{s.value}</p>
            <p className="section-label mt-0.5" style={{ fontSize: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Vaccine list */}
      <div className="px-[22px] mb-5">
        <SectionLabel>VACCINE SCHEDULE</SectionLabel>
        <div className="card py-0 px-[18px]">
          {vaccines.map((v, i) => (
            <Link key={v.id} href={`/vaccines/${v.id}`}>
              <div className="flex items-center gap-3 py-3"
                style={{ borderBottom: i < vaccines.length - 1 ? "0.5px solid #111" : "none" }}>
                <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: v.done ? "rgba(77,139,59,0.1)" : v.overdue ? "rgba(239,68,68,0.1)" : "#111" }}>
                  {v.done
                    ? <CheckCircle size={15} color="#4D8B3B" strokeWidth={1.5} />
                    : v.overdue
                    ? <AlertCircle size={15} color="#EF4444" strokeWidth={1.5} />
                    : <Clock size={15} color="#555" strokeWidth={1.5} />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-600 text-white">{v.name}</p>
                  <p className="mono text-[10px] mt-0.5"
                    style={{ color: v.done ? "#4D8B3B" : v.overdue ? "#EF4444" : "#555" }}>
                    {v.done ? `Given: ${v.date}` : v.next}
                  </p>
                </div>
                <ChevronRight size={13} color="#333" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="fab" onClick={() => {}}><Plus size={18} color="#000" strokeWidth={2} /></div>
      <BottomNav />
    </div>
  );
}
