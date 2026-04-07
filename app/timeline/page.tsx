"use client";
import { useState } from "react";
import { Search, Plus, ChevronRight, FileText, Stethoscope, Pill, Syringe, StickyNote } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

type FilterType = "All" | "Labs" | "Visits" | "Medicines" | "Vaccines" | "Notes";

const events = [
  { id: 1, type: "Labs", title: "CBC + Thyroid Panel", subtitle: "Dr. Lal PathLabs · 8 parameters", date: "Apr 5, 2025", color: "#D4A847", icon: FileText, flags: 2 },
  { id: 2, type: "Visits", title: "Dr. Priya Menon — Endocrinologist", subtitle: "Thyroid follow-up · AIIMS", date: "Apr 3, 2025", color: "#5A8AC0", icon: Stethoscope, flags: 0 },
  { id: 3, type: "Medicines", title: "Levothyroxine 50 mcg added", subtitle: "Prescribed by Dr. Priya Menon", date: "Apr 2, 2025", color: "#9A7EC0", icon: Pill, flags: 0 },
  { id: 4, type: "Labs", title: "Lipid Profile", subtitle: "Thyrocare · 6 parameters", date: "Mar 28, 2025", color: "#D4A847", icon: FileText, flags: 1 },
  { id: 5, type: "Vaccines", title: "Influenza Vaccine", subtitle: "AIIMS OPD · Batch #FL2025A", date: "Mar 20, 2025", color: "#4D8B3B", icon: Syringe, flags: 0 },
  { id: 6, type: "Visits", title: "Dr. Arun Kumar — Cardiologist", subtitle: "Routine cardiac checkup", date: "Mar 15, 2025", color: "#5A8AC0", icon: Stethoscope, flags: 0 },
  { id: 7, type: "Notes", title: "Knee pain started", subtitle: "Bilateral · worsens on stairs", date: "Mar 10, 2025", color: "#888", icon: StickyNote, flags: 0 },
  { id: 8, type: "Labs", title: "Renal Function Test", subtitle: "Metropolis · 5 parameters", date: "Feb 20, 2025", color: "#D4A847", icon: FileText, flags: 0 },
  { id: 9, type: "Medicines", title: "Vitamin D3 2000 IU added", subtitle: "AI recommendation", date: "Feb 15, 2025", color: "#9A7EC0", icon: Pill, flags: 0 },
  { id: 10, type: "Labs", title: "HbA1c + Glucose", subtitle: "SRL Diagnostics · 3 parameters", date: "Jan 10, 2025", color: "#D4A847", icon: FileText, flags: 0 },
];

const dateFilters = ["Week", "Month", "3 Months", "Year", "All"];
const typeFilters: FilterType[] = ["All", "Labs", "Visits", "Medicines", "Vaccines", "Notes"];

function groupByDate(evs: typeof events) {
  const groups: Record<string, typeof events> = {};
  evs.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });
  return groups;
}

export default function TimelinePage() {
  const [dateFilter, setDateFilter] = useState("Month");
  const [typeFilter, setTypeFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    if (typeFilter !== "All" && e.type !== typeFilter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const groups = groupByDate(filtered);

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>HEALTH</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Timeline</h1>
      </div>

      {/* Search */}
      <div className="px-[22px] mb-4">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
          <Search size={14} color="#444" strokeWidth={1.5} />
          <input
            className="flex-1 bg-transparent text-[13px] text-white placeholder-[#333] outline-none"
            placeholder="Search timeline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Date filters */}
      <div className="px-[22px] mb-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {dateFilters.map((f) => (
          <button key={f}
            onClick={() => setDateFilter(f)}
            className="flex-shrink-0 px-3 py-1.5 rounded-[4px] text-[11px] font-600 transition-all"
            style={{
              background: dateFilter === f ? "#D4A847" : "#0A0908",
              color: dateFilter === f ? "#000" : "#555",
              border: dateFilter === f ? "none" : "0.5px solid #1A1710",
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Type filter chips */}
      <div className="px-[22px] mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {typeFilters.map((f) => (
          <button key={f}
            onClick={() => setTypeFilter(f)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-600 transition-all"
            style={{
              background: typeFilter === f ? "rgba(212,168,71,0.1)" : "transparent",
              color: typeFilter === f ? "#D4A847" : "#555",
              border: `0.5px solid ${typeFilter === f ? "rgba(212,168,71,0.3)" : "#1A1710"}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-[22px] relative">
        {/* Vertical line */}
        <div className="absolute left-[30px] top-0 bottom-0 w-[0.5px] bg-[#111]" />

        {Object.entries(groups).map(([month, evs]) => (
          <div key={month} className="mb-6">
            <SectionLabel className="pl-10">{month.toUpperCase()}</SectionLabel>
            <div className="space-y-3">
              {evs.map((ev) => {
                const Icon = ev.icon;
                return (
                  <div key={ev.id} className="flex items-start gap-3">
                    {/* Dot */}
                    <div className="flex-shrink-0 w-[16px] h-[16px] rounded-full flex items-center justify-center z-10 mt-3"
                      style={{ background: ev.color + "20", border: `1px solid ${ev.color}50` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: ev.color }} />
                    </div>
                    {/* Card */}
                    <div className="flex-1 card flex items-center gap-3 py-3 px-3.5">
                      <div className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                        style={{ background: ev.color + "10" }}>
                        <Icon size={15} strokeWidth={1.5} style={{ color: ev.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-600 text-white leading-tight truncate">{ev.title}</p>
                        <p className="text-[10px] text-[#444] mt-0.5 truncate">{ev.subtitle}</p>
                        {ev.flags > 0 && (
                          <span className="inline-block mt-1 text-[9px] font-700 px-1.5 py-0.5 rounded-[3px]"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                            {ev.flags} out of range
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="mono text-[10px] text-[#333]">{ev.date.split(",")[0]}</span>
                        <ChevronRight size={13} color="#333" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <div className="fab" onClick={() => {}}>
        <Plus size={18} color="#000" strokeWidth={2} />
      </div>

      <BottomNav />
    </div>
  );
}
