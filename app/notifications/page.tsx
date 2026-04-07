"use client";
import { Bell, Pill, AlertCircle, Brain, Calendar, Syringe, X } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";

const notifications = [
  { id: 1, type: "Medicine", icon: Pill, color: "#9A7EC0", title: "Levothyroxine due", body: "Take 50 mcg on empty stomach", time: "07:00", group: "Today", read: false },
  { id: 2, type: "Alert", icon: AlertCircle, color: "#EF4444", title: "TSH critically high", body: "7.8 mIU/L — endocrinologist consult needed", time: "06:30", group: "Today", read: false },
  { id: 3, type: "AI", icon: Brain, color: "#D4A847", title: "New AI insight available", body: "Thyroid-lipid cascade analysis ready", time: "06:00", group: "Today", read: true },
  { id: 4, type: "Appointment", icon: Calendar, color: "#5A8AC0", title: "Dr. Priya Menon", body: "Thyroid follow-up — Tomorrow 11:00 AM", time: "Yesterday", group: "Earlier", read: true },
  { id: 5, type: "Medicine", icon: Pill, color: "#9A7EC0", title: "Vitamin D3 reminder", body: "Take with breakfast — 2000 IU", time: "Yesterday", group: "Earlier", read: true },
  { id: 6, type: "Vaccine", icon: Syringe, color: "#4D8B3B", title: "Hepatitis B overdue", body: "3rd dose was due 6 months ago", time: "3 days ago", group: "This Week", read: true },
  { id: 7, type: "AI", icon: Brain, color: "#D4A847", title: "Score improved +6 pts", body: "Your Helthr Score reached 72 this month", time: "5 days ago", group: "This Week", read: true },
];

const groups = ["Today", "Earlier", "This Week"];

export default function NotificationsPage() {
  const grouped = groups.reduce((acc, g) => {
    acc[g] = notifications.filter((n) => n.group === g);
    return acc;
  }, {} as Record<string, typeof notifications>);

  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4 flex items-end justify-between">
        <div>
          <p className="section-label" style={{ letterSpacing: "2px" }}>NOTIFICATIONS</p>
          <h1 className="text-[22px] font-700 text-white mt-1">Alerts</h1>
        </div>
        <button className="text-[11px] text-[#D4A847]">Mark all read</button>
      </div>

      {groups.map((g) => {
        const items = grouped[g];
        if (!items?.length) return null;
        return (
          <div key={g} className="px-[22px] mb-5">
            <SectionLabel>{g.toUpperCase()}</SectionLabel>
            <div className="space-y-1.5">
              {items.map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.id}
                    className="flex items-start gap-3 px-4 py-3.5 rounded-[12px]"
                    style={{
                      background: n.read ? "#0A0908" : "#0D0B08",
                      border: `0.5px solid ${n.read ? "#1A1710" : n.color + "30"}`,
                    }}>
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: n.color + "10" }}>
                      <Icon size={15} strokeWidth={1.5} style={{ color: n.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-[12px] font-600 ${n.read ? "text-[#888]" : "text-white"}`}>{n.title}</p>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A847] flex-shrink-0" />}
                      </div>
                      <p className="text-[10px] text-[#444] mt-0.5">{n.body}</p>
                      <p className="mono text-[9px] text-[#333] mt-1">{n.time}</p>
                    </div>
                    <button className="p-1 mt-0.5">
                      <X size={11} color="#333" strokeWidth={1.5} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <BottomNav />
    </div>
  );
}
