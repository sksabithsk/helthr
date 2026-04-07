"use client";
import { Plus, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";
import ScoreRing from "../components/ScoreRing";

const members = [
  { id: "arjun", name: "Arjun Sharma", role: "Admin", age: 38, blood: "B+", score: 72, alerts: 3, color: "#D4A847", initial: "A" },
  { id: "priya", name: "Priya Sharma", role: "Member", age: 35, blood: "O+", score: 84, alerts: 0, color: "#9A7EC0", initial: "P" },
  { id: "rohan", name: "Rohan Sharma", role: "Child", age: 8, blood: "B+", score: 91, alerts: 0, color: "#4D8B3B", initial: "R" },
];

export default function FamilyPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4 flex items-end justify-between">
        <div>
          <p className="section-label" style={{ letterSpacing: "2px" }}>FAMILY</p>
          <h1 className="text-[22px] font-700 text-white mt-1">Members</h1>
        </div>
        <Link href="/family/add">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
            style={{ background: "rgba(212,168,71,0.1)", border: "0.5px solid rgba(212,168,71,0.2)" }}>
            <Plus size={15} color="#D4A847" strokeWidth={2} />
          </div>
        </Link>
      </div>

      <div className="px-[22px] mb-5 space-y-3">
        {members.map((m) => (
          <div key={m.id} className="card flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[18px] font-700 flex-shrink-0"
              style={{ background: m.color + "15", border: `1.5px solid ${m.color}30`, color: m.color }}>
              {m.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-700 text-white">{m.name}</p>
                <span className="pill text-[#555]">{m.role}</span>
              </div>
              <p className="text-[11px] text-[#444] mt-0.5">{m.age}y · {m.blood}</p>
              {m.alerts > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle size={10} color="#EF4444" strokeWidth={1.5} />
                  <span className="text-[10px] text-[#EF4444]">{m.alerts} alerts</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <ScoreRing score={m.score} size={44} strokeWidth={4} showLabel={false} />
              <ChevronRight size={13} color="#333" strokeWidth={1.5} />
            </div>
          </div>
        ))}

        {/* Add member */}
        <Link href="/family/add">
          <div className="rounded-[16px] py-5 flex items-center justify-center gap-3"
            style={{ border: "1px dashed #1A1710" }}>
            <Plus size={16} color="#333" strokeWidth={1.5} />
            <span className="text-[13px] font-600 text-[#444]">Add family member</span>
          </div>
        </Link>
      </div>

      {/* Roles */}
      <div className="px-[22px] mb-5">
        <SectionLabel>MANAGE ACCESS</SectionLabel>
        <div className="card py-0 px-[18px]">
          {[
            { label: "Caregiver invite", sub: "Invite nurse or caregiver" },
            { label: "Doctor access", sub: "Grant read access to doctors" },
            { label: "Emergency access", sub: "Family emergency permissions" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center justify-between py-3"
              style={{ borderBottom: i < 2 ? "0.5px solid #111" : "none" }}>
              <div>
                <p className="text-[12px] font-600 text-white">{item.label}</p>
                <p className="text-[10px] text-[#444] mt-0.5">{item.sub}</p>
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
