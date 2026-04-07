"use client";
import { Plus, ChevronRight, Stethoscope } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const visits = [
  { id: "v1", doctor: "Dr. Priya Menon", specialty: "Endocrinologist", date: "Apr 3, 2025", complaint: "Thyroid follow-up", color: "#5A8AC0" },
  { id: "v2", doctor: "Dr. Arun Kumar", specialty: "Cardiologist", date: "Mar 15, 2025", complaint: "Routine cardiac checkup", color: "#EF4444" },
  { id: "v3", doctor: "Dr. Neha Singh", specialty: "General Physician", date: "Feb 8, 2025", complaint: "Annual checkup + referrals", color: "#4D8B3B" },
  { id: "v4", doctor: "Dr. Priya Menon", specialty: "Endocrinologist", date: "Dec 20, 2024", complaint: "TSH borderline — monitoring", color: "#5A8AC0" },
  { id: "v5", doctor: "Dr. Ramesh Iyer", specialty: "Orthopedic", date: "Nov 5, 2024", complaint: "Right knee pain evaluation", color: "#9A7EC0" },
];

export default function VisitsPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>DOCTOR</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Visits</h1>
      </div>

      <div className="px-[22px] mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "TOTAL VISITS", value: String(visits.length) },
          { label: "THIS YEAR", value: "3" },
          { label: "DOCTORS", value: "4" },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className="mono text-[20px] font-700 text-white">{s.value}</p>
            <p className="section-label mt-0.5" style={{ fontSize: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-[22px] mb-5">
        <SectionLabel>ALL VISITS</SectionLabel>
        <div className="space-y-2">
          {visits.map((v) => (
            <Link key={v.id} href={`/visits/${v.id}`}>
              <div className="card flex items-center gap-3 py-3.5 px-4">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: v.color + "10" }}>
                  <Stethoscope size={16} strokeWidth={1.5} style={{ color: v.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-600 text-white truncate">{v.doctor}</p>
                  <p className="text-[10px] text-[#555] mt-0.5">{v.specialty}</p>
                  <p className="text-[11px] text-[#444] mt-0.5 truncate">{v.complaint}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="mono text-[10px] text-[#333]">{v.date}</span>
                  <ChevronRight size={13} color="#333" strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/visits/log">
        <div className="fab"><Plus size={18} color="#000" strokeWidth={2} /></div>
      </Link>
      <BottomNav />
    </div>
  );
}
