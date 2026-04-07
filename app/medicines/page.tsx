"use client";
import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";
import ProgressBar from "../components/ProgressBar";

const activeMeds = [
  { id: "levothyroxine", name: "Levothyroxine", dose: "50 mcg", form: "Tablet", freq: "Once daily", nextDose: "07:00 AM", adherence: 85, color: "#9A7EC0", doctor: "Dr. Priya Menon", daysLeft: 22 },
  { id: "vitamin-d3", name: "Vitamin D3", dose: "2000 IU", form: "Capsule", freq: "Once daily", nextDose: "08:30 AM", adherence: 92, color: "#D4A847", doctor: "AI Recommended", daysLeft: 45 },
  { id: "omega-3", name: "Omega-3 Fatty Acids", dose: "1000 mg", form: "Capsule", freq: "Twice daily", nextDose: "01:00 PM", adherence: 78, color: "#5A8AC0", doctor: "Dr. Arun Kumar", daysLeft: 18 },
  { id: "calcium-k2", name: "Calcium + Vit K2", dose: "500 mg", form: "Tablet", freq: "Once nightly", nextDose: "10:00 PM", adherence: 70, color: "#4D8B3B", doctor: "AI Recommended", daysLeft: 60 },
];

const pastMeds = [
  { id: "metformin", name: "Metformin", dose: "500 mg", form: "Tablet", freq: "Twice daily", stopped: "Jan 2025", reason: "Discontinued by doctor" },
  { id: "atorvastatin", name: "Atorvastatin", dose: "10 mg", form: "Tablet", freq: "Once nightly", stopped: "Nov 2024", reason: "Side effects reported" },
];

export default function MedicinesPage() {
  const [showPast, setShowPast] = useState(false);

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>MEDICATION</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Medicines</h1>
      </div>

      {/* Today summary */}
      <div className="mx-[22px] mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "ACTIVE", value: String(activeMeds.length), color: "#D4A847" },
          { label: "TAKEN TODAY", value: "2", color: "#4D8B3B" },
          { label: "PENDING", value: "2", color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className="mono text-[22px] font-700" style={{ color: s.color }}>{s.value}</p>
            <p className="section-label mt-0.5" style={{ fontSize: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Active medications */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ACTIVE MEDICATIONS</SectionLabel>
        <div className="space-y-2">
          {activeMeds.map((med) => (
            <Link key={med.id} href={`/medicines/${med.id}`}>
              <div className="card flex items-start gap-3 py-3.5 px-4">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: med.color + "12" }}>
                  <span className="text-[16px]">💊</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-600 text-white leading-tight">{med.name}</p>
                    <span className="mono text-[11px] text-[#D4A847] flex-shrink-0">{med.nextDose}</span>
                  </div>
                  <p className="text-[10px] text-[#444] mt-0.5">{med.dose} · {med.freq} · {med.form}</p>
                  <p className="text-[10px] text-[#333] mt-0.5">{med.doctor}</p>
                  <ProgressBar value={med.adherence} color={med.color} showMarker={false} className="mt-2" />
                  <p className="mono text-[9px] text-[#555] mt-1">{med.adherence}% adherence · {med.daysLeft}d supply left</p>
                </div>
                <ChevronRight size={13} color="#333" strokeWidth={1.5} className="mt-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Past medications */}
      <div className="px-[22px] mb-5">
        <button className="w-full flex items-center justify-between mb-3"
          onClick={() => setShowPast((v) => !v)}>
          <span className="section-label">PAST MEDICATIONS</span>
          <span className="text-[10px] text-[#D4A847]">{showPast ? "Hide" : "Show"} ({pastMeds.length})</span>
        </button>
        {showPast && (
          <div className="space-y-2">
            {pastMeds.map((med) => (
              <div key={med.id} className="card flex items-center gap-3 py-3 px-4 opacity-50">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                  style={{ background: "#111" }}>
                  <span className="text-[16px] grayscale">💊</span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-600 text-[#555] line-through">{med.name}</p>
                  <p className="text-[10px] text-[#333] mt-0.5">{med.dose} · Stopped {med.stopped}</p>
                  <p className="text-[10px] text-[#333]">{med.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/medicines/add">
        <div className="fab"><Plus size={18} color="#000" strokeWidth={2} /></div>
      </Link>
      <BottomNav />
    </div>
  );
}
