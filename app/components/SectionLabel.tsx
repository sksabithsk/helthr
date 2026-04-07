interface SectionLabelProps {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, action, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center justify-between mb-3 ${className}`}>
      <span className="section-label">{children}</span>
      {action && <div>{action}</div>}
    </div>
  );
}
