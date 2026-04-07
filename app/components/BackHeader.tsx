"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function BackHeader({ title, subtitle, action }: BackHeaderProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3 px-[22px] pt-3 pb-4">
      <button
        onClick={() => router.back()}
        className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
        style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}
      >
        <ArrowLeft size={15} color="#888" strokeWidth={1.5} />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-[16px] font-700 text-white truncate">{title}</h1>
        {subtitle && <p className="text-[11px] text-[#555] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
