export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 select-none">
      <span className="mono text-[13px] font-bold text-white/90">9:41</span>
      <div className="w-[120px] h-[34px] rounded-full bg-black border border-white/10 mx-auto absolute left-1/2 -translate-x-1/2" />
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="5" width="2.5" height="6" rx="1" fill="white" fillOpacity="0.35"/>
          <rect x="3.5" y="3.5" width="2.5" height="7.5" rx="1" fill="white" fillOpacity="0.55"/>
          <rect x="7" y="2" width="2.5" height="9" rx="1" fill="white" fillOpacity="0.75"/>
          <rect x="10.5" y="0.5" width="2.5" height="10.5" rx="1" fill="white"/>
          <rect x="13.5" y="0" width="2.5" height="11" rx="1" fill="white"/>
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 8.5C8.3 8.5 9 9.2 9 10C9 10.8 8.3 11 7.5 11C6.7 11 6 10.8 6 10C6 9.2 6.7 8.5 7.5 8.5Z" fill="white"/>
          <path d="M4.5 6.5C5.5 5.5 6.5 5 7.5 5C8.5 5 9.5 5.5 10.5 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M2 4C3.5 2.5 5.5 1.5 7.5 1.5C9.5 1.5 11.5 2.5 13 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" fill="none"/>
          <path d="M0 1.5C2 -0.2 4.7 -0.8 7.5 -0.8C10.3 -0.8 13 -0.2 15 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.3" fill="none"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
          <path d="M23 4v4c1-.5 1.5-1.2 1.5-2S24 4.5 23 4z" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
