export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className="text-[13px] font-semibold text-white/90">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="4" width="3" height="8" rx="1" fill="white" fillOpacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="white" fillOpacity="0.6"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="white" fillOpacity="0.8"/>
          <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="white"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5C9.8 2.5 11.4 3.2 12.6 4.4L14 3C12.4 1.4 10.3 0.5 8 0.5C5.7 0.5 3.6 1.4 2 3L3.4 4.4C4.6 3.2 6.2 2.5 8 2.5Z" fill="white" fillOpacity="0.5"/>
          <path d="M8 5.5C9.1 5.5 10.1 5.9 10.8 6.7L12.2 5.3C11.1 4.2 9.6 3.5 8 3.5C6.4 3.5 4.9 4.2 3.8 5.3L5.2 6.7C5.9 5.9 6.9 5.5 8 5.5Z" fill="white" fillOpacity="0.75"/>
          <circle cx="8" cy="9.5" r="1.5" fill="white"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
