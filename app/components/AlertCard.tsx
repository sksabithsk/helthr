import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface AlertCardProps {
  title: string;
  subtitle: string;
  color: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function AlertCard({ title, subtitle, color, href = "#", icon }: AlertCardProps) {
  return (
    <Link href={href}>
      <div
        className="alert-card flex items-center gap-3 mb-1"
        style={{ borderLeft: `2px solid ${color}` }}
      >
        {icon && (
          <div className="flex-shrink-0" style={{ color }}>{icon}</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-600 leading-tight" style={{ color }}>{title}</p>
          <p className="text-[10px] text-[#444] mt-0.5 leading-tight truncate">{subtitle}</p>
        </div>
        <ChevronRight size={13} color="#333" strokeWidth={1.5} />
      </div>
    </Link>
  );
}
