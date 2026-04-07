"use client";
import { useState } from "react";
import { Search, Plus, ChevronRight, FileText, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const reports = [
  { id: "cbc-apr-2025", name: "CBC — Complete Blood Count", date: "Apr 5, 2025", lab: "Dr. Lal PathLabs", total: 12, outRange: 1, color: "#D4A847" },
  { id: "thyroid-apr-2025", name: "Thyroid Panel (TSH, T3, T4)", date: "Apr 5, 2025", lab: "Dr. Lal PathLabs", total: 4, outRange: 2, color: "#EF4444" },
  { id: "lipid-mar-2025", name: "Lipid Profile", date: "Mar 28, 2025", lab: "Thyrocare", total: 6, outRange: 2, color: "#F59E0B" },
  { id: "renal-feb-2025", name: "Renal Function Test", date: "Feb 20, 2025", lab: "Metropolis", total: 8, outRange: 0, color: "#4D8B3B" },
  { id: "hba1c-jan-2025", name: "HbA1c + Fasting Glucose", date: "Jan 10, 2025", lab: "SRL Diagnostics", total: 3, outRange: 1, color: "#F59E0B" },
  { id: "vitamins-dec-2024", name: "Vitamin Panel (D, B12, Iron)", date: "Dec 15, 2024", lab: "Thyrocare", total: 5, outRange: 2, color: "#EF4444" },
  { id: "cbc-sep-2024", name: "CBC — Complete Blood Count", date: "Sep 2, 2024", lab: "Dr. Lal PathLabs", total: 12, outRange: 0, color: "#4D8B3B" },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const filtered = reports.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.lab.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4 flex items-end justify-between">
        <div>
          <p className="section-label" style={{ letterSpacing: "2px" }}>LAB</p>
          <h1 className="text-[22px] font-700 text-white mt-1">Reports</h1>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[11px] font-600 text-[#888]"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
          <ArrowUpDown size={11} strokeWidth={1.5} />
          Sort
        </button>
      </div>

      {/* Search */}
      <div className="px-[22px] mb-5">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
          <Search size={14} color="#444" strokeWidth={1.5} />
          <input className="flex-1 bg-transparent text-[13px] text-white placeholder-[#333] outline-none"
            placeholder="Search reports..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Stats */}
      <div className="px-[22px] mb-5 grid grid-cols-3 gap-2">
        {[
          { label: "REPORTS", value: String(reports.length) },
          { label: "OUT OF RANGE", value: String(reports.reduce((a, r) => a + r.outRange, 0)) },
          { label: "LABS", value: "4" },
        ].map((s) => (
          <div key={s.label} className="card text-center py-3">
            <p className="mono text-[20px] font-700 text-white">{s.value}</p>
            <p className="section-label mt-1" style={{ fontSize: 8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Reports list */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ALL REPORTS</SectionLabel>
        <div className="space-y-2">
          {filtered.map((r) => (
            <Link key={r.id} href={`/reports/${r.id}`}>
              <div className="card flex items-center gap-3 py-3.5 px-4">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: r.color + "10" }}>
                  <FileText size={16} strokeWidth={1.5} style={{ color: r.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-600 text-white leading-tight truncate">{r.name}</p>
                  <p className="text-[10px] text-[#444] mt-0.5">{r.lab} · <span className="mono">{r.date}</span></p>
                  {r.outRange > 0 ? (
                    <span className="inline-block mt-1 text-[9px] font-700 px-1.5 py-0.5 rounded-[3px]"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                      {r.outRange} out of {r.total} out of range
                    </span>
                  ) : (
                    <span className="inline-block mt-1 text-[9px] font-700 px-1.5 py-0.5 rounded-[3px]"
                      style={{ background: "rgba(77,139,59,0.1)", color: "#4D8B3B" }}>
                      All in range
                    </span>
                  )}
                </div>
                <ChevronRight size={14} color="#333" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/reports/upload">
        <div className="fab"><Plus size={18} color="#000" strokeWidth={2} /></div>
      </Link>

      <BottomNav />
    </div>
  );
}
