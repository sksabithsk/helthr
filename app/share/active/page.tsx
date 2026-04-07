"use client";
import { Eye, Trash2, Clock, ChevronRight } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

const activeShares = [
  { id: "1", doctor: "Dr. Priya Menon", sections: ["Summary", "Labs", "Meds"], expires: "2d 14h", views: 3, color: "#5A8AC0" },
  { id: "2", doctor: "Dr. Arun Kumar", sections: ["Summary", "Labs"], expires: "5d 2h", views: 1, color: "#EF4444" },
];

const expiredShares = [
  { doctor: "Dr. Neha Singh", sections: ["Summary"], expired: "Mar 28, 2025", views: 2 },
  { doctor: "Apollo Emergency", sections: ["Summary", "Meds", "Vaccines"], expired: "Jan 15, 2025", views: 5 },
];

export default function ActiveSharesPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Active Shares" subtitle="Doctor bridge links" />

      <div className="px-[22px] mb-5">
        <SectionLabel>ACTIVE ({activeShares.length})</SectionLabel>
        <div className="space-y-3">
          {activeShares.map((s) => (
            <div key={s.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[13px] font-600 text-white">{s.doctor}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {s.sections.map((sec) => (
                      <span key={sec} className="pill text-[#888]">{sec}</span>
                    ))}
                  </div>
                </div>
                <button className="w-7 h-7 rounded-[6px] flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.08)" }}>
                  <Trash2 size={12} color="#EF4444" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "0.5px solid #111" }}>
                <div className="flex items-center gap-1.5">
                  <Clock size={11} color="#555" strokeWidth={1.5} />
                  <span className="mono text-[10px] text-[#555]">Expires in {s.expires}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={11} color="#555" strokeWidth={1.5} />
                  <span className="mono text-[10px] text-[#555]">{s.views} views</span>
                </div>
                <button className="text-[10px] text-[#D4A847]">Extend →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[22px] mb-5">
        <SectionLabel>EXPIRED</SectionLabel>
        <div className="space-y-2 opacity-40">
          {expiredShares.map((s, i) => (
            <div key={i} className="card py-3 px-4 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-600 text-[#555]">{s.doctor}</p>
                <p className="mono text-[10px] text-[#333] mt-0.5">Expired {s.expired} · {s.views} views</p>
              </div>
              <ChevronRight size={13} color="#333" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
