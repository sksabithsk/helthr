"use client";
import { Bell, Upload } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";
import SectionLabel from "../../components/SectionLabel";

export default function VaccineDetailPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <BackHeader title="Influenza Vaccine" subtitle="Annual · Last given Mar 20, 2025" />

      <div className="mx-[22px] mb-5 card">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "GIVEN ON", value: "Mar 20, 2025" },
            { label: "BATCH NO.", value: "FL2025A" },
            { label: "FACILITY", value: "AIIMS OPD" },
            { label: "DOCTOR", value: "Dr. Neha Singh" },
            { label: "NEXT BOOSTER", value: "Mar 2026" },
            { label: "REMINDER", value: "Set for Feb 2026" },
          ].map((item) => (
            <div key={item.label}>
              <p className="section-label" style={{ fontSize: 8 }}>{item.label}</p>
              <p className="text-[12px] font-600 text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[22px] mb-5">
        <SectionLabel>CERTIFICATE</SectionLabel>
        <button className="w-full card flex items-center gap-4 py-4 px-5">
          <Upload size={20} color="#D4A847" strokeWidth={1.5} />
          <div className="text-left">
            <p className="text-[13px] font-600 text-white">Upload Certificate</p>
            <p className="text-[10px] text-[#444] mt-0.5">PDF or image</p>
          </div>
        </button>
      </div>

      <div className="px-[22px] mb-5">
        <button className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "#0A0908", border: "0.5px solid #1A1710", color: "#888" }}>
          <Bell size={14} strokeWidth={1.5} />
          Set Reminder for Next Dose
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
