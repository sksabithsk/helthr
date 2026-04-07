"use client";
import { ChevronRight, User, Bell, Lock, Database, HelpCircle, LogOut, Smartphone } from "lucide-react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import SectionLabel from "../components/SectionLabel";
import Link from "next/link";

const settingsSections = [
  {
    title: "PROFILE",
    items: [
      { icon: User, label: "Personal Details", sub: "Name, age, blood group", href: "#", color: "#D4A847" },
      { icon: Smartphone, label: "Emergency Card", sub: "Configure lock screen card", href: "/emergency", color: "#EF4444" },
    ],
  },
  {
    title: "APP",
    items: [
      { icon: Bell, label: "Notifications", sub: "Medicine, alerts, AI reminders", href: "#", color: "#5A8AC0" },
      { icon: Smartphone, label: "Connected Apps", sub: "Apple Health, Google Fit", href: "#", color: "#4D8B3B" },
    ],
  },
  {
    title: "PRIVACY",
    items: [
      { icon: Lock, label: "Privacy & Security", sub: "Biometric, passcode, 2FA", href: "#", color: "#9A7EC0" },
      { icon: Database, label: "Data Export", sub: "Download your health data", href: "#", color: "#D4A847" },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: HelpCircle, label: "Help & Support", sub: "FAQs, contact, feedback", href: "#", color: "#888" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="pb-24">
      <StatusBar />
      <div className="px-[22px] pt-2 pb-4">
        <p className="section-label" style={{ letterSpacing: "2px" }}>APP</p>
        <h1 className="text-[22px] font-700 text-white mt-1">Settings</h1>
      </div>

      {/* Profile card */}
      <div className="mx-[22px] mb-5 card flex items-center gap-4">
        <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-[22px] font-700 text-[#D4A847]"
          style={{ background: "rgba(212,168,71,0.1)", border: "1.5px solid rgba(212,168,71,0.2)" }}>
          A
        </div>
        <div className="flex-1">
          <p className="text-[16px] font-700 text-white">Arjun Sharma</p>
          <p className="text-[11px] text-[#444] mt-0.5">arjun@email.com</p>
          <p className="text-[10px] text-[#D4A847] mt-0.5">Member since Jan 2024</p>
        </div>
        <ChevronRight size={13} color="#333" strokeWidth={1.5} />
      </div>

      {/* Settings sections */}
      {settingsSections.map((section) => (
        <div key={section.title} className="px-[22px] mb-5">
          <SectionLabel>{section.title}</SectionLabel>
          <div className="card py-0 px-[18px]">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href}>
                  <div className="flex items-center gap-3 py-3.5"
                    style={{ borderBottom: i < section.items.length - 1 ? "0.5px solid #111" : "none" }}>
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                      style={{ background: item.color + "10" }}>
                      <Icon size={14} strokeWidth={1.5} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-600 text-white">{item.label}</p>
                      <p className="text-[10px] text-[#444] mt-0.5">{item.sub}</p>
                    </div>
                    <ChevronRight size={13} color="#333" strokeWidth={1.5} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {/* Version */}
      <div className="px-[22px] mb-3 text-center">
        <p className="mono text-[10px] text-[#333]">Helthr v2.1.4 · Build 241</p>
      </div>

      {/* Logout */}
      <div className="px-[22px] mb-5">
        <button className="w-full py-3 rounded-[10px] text-[13px] font-600 flex items-center justify-center gap-2"
          style={{ background: "rgba(239,68,68,0.06)", border: "0.5px solid rgba(239,68,68,0.15)", color: "#EF4444" }}>
          <LogOut size={14} strokeWidth={1.5} /> Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
