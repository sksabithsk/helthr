"use client";
import { Plus, FileText, Shield, CreditCard, ChevronRight, Share2 } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const docs = [
  { id: 1, name: "Health Insurance Card", type: "Insurance", date: "Valid till Dec 2026", icon: Shield, color: "#4D8B3B" },
  { id: 2, name: "Star Health Policy #SH-2024", type: "Insurance", date: "Uploaded Mar 2024", icon: FileText, color: "#4D8B3B" },
  { id: 3, name: "Aadhar Card", type: "ID", date: "Uploaded Jan 2024", icon: CreditCard, color: "#5A8AC0" },
  { id: 4, name: "Disability Certificate", type: "Certificate", date: "Issued Feb 2023", icon: FileText, color: "#D4A847" },
  { id: 5, name: "COVID-19 Vaccination Certificate", type: "Vaccine", date: "Jan 2025", icon: Shield, color: "#4D8B3B" },
];

const categories = ["All", "Insurance", "ID", "Certificate", "Vaccine"];

export default function DocumentsPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>DOCUMENT</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Vault</h1>
      </div>

      {/* Category chips */}
      <div className="px-[22px] mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c, i) => (
          <button key={c}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-600 transition-all"
            style={{
              background: i === 0 ? "rgba(212,168,71,0.1)" : "transparent",
              color: i === 0 ? "#D4A847" : "#555",
              border: `0.5px solid ${i === 0 ? "rgba(212,168,71,0.3)" : "#1A1710"}`,
            }}>
            {c}
          </button>
        ))}
      </div>

      {/* Docs list */}
      <div className="px-[22px] mb-5">
        <SectionLabel>ALL DOCUMENTS ({docs.length})</SectionLabel>
        <div className="space-y-2">
          {docs.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.id} className="card flex items-center gap-3 py-3.5 px-4">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: d.color + "10" }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: d.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-600 text-white truncate">{d.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="pill text-[#555]" style={{ fontSize: 9 }}>{d.type}</span>
                    <span className="mono text-[10px] text-[#333]">{d.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 rounded-[6px] flex items-center justify-center"
                    style={{ background: "#111" }}>
                    <Share2 size={11} color="#555" strokeWidth={1.5} />
                  </button>
                  <ChevronRight size={13} color="#333" strokeWidth={1.5} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload zone */}
      <div className="mx-[22px] mb-5 rounded-[16px] py-8 flex flex-col items-center gap-3"
        style={{ border: "1px dashed #1A1710" }}>
        <FileText size={24} color="#333" strokeWidth={1} />
        <p className="text-[12px] text-[#444]">Upload document (PDF, JPG, PNG)</p>
      </div>

      <div className="fab"><Plus size={18} color="#000" strokeWidth={2} /></div>
      <BottomNav />
    </div>
  );
}
