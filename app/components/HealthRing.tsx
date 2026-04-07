"use client";
import { useEffect, useRef, useState } from "react";

interface HealthRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color: string;
  glowClass?: string;
  label: string;
  sublabel: string;
  centerIcon?: React.ReactNode;
  onClick?: () => void;
}

export default function HealthRing({
  size = 88,
  strokeWidth = 8,
  progress,
  color,
  glowClass,
  label,
  sublabel,
  centerIcon,
  onClick,
}: HealthRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={glowClass}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerIcon && (
            <div className="mb-0.5" style={{ color }}>
              {centerIcon}
            </div>
          )}
          <span className="text-[13px] font-bold text-white/90">
            {Math.round(animatedProgress)}%
          </span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-[11px] font-semibold text-white/85 leading-tight">
          {label}
        </div>
        <div className="text-[9px] text-white/40 leading-tight mt-0.5">
          {sublabel}
        </div>
      </div>
    </button>
  );
}
