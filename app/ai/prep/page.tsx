"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bookmark } from "lucide-react";
import StatusBar from "../../components/StatusBar";
import BackHeader from "../../components/BackHeader";
import BottomNav from "../../components/BottomNav";

type Message = { role: "user" | "ai"; text: string; saved?: boolean };

const suggestions = [
  "What should I ask about TSH?",
  "What are side effects of Levothyroxine?",
  "How long before thyroid normalizes?",
  "Is my Vitamin D dangerous?",
];

const aiResponses: Record<string, string> = {
  "what should i ask about tsh?": `Based on your TSH of 7.8, ask your doctor:\n\n1. Should my dose increase above 50 mcg?\n2. When to retest — 6 or 8 weeks?\n3. Should we check Anti-TPO to confirm Hashimoto's?\n4. Are my fatigue symptoms consistent with this level?\n\nYour T4 of 0.74 is also below range — make sure this is addressed separately.`,
  "default": `Based on your health profile, I'd recommend discussing:\n\n• **TSH at 7.8** — significantly above range, Levothyroxine may need dose adjustment\n• **Vitamin D at 18.4** — supplement dose may need increasing to 4000 IU\n• **Lipid trend** — LDL and Triglycerides both rising; thyroid treatment should help\n\nWould you like me to prepare specific questions for any of these?`,
};

export default function PrepPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I'll help you prepare for your doctor visit. I've reviewed your health data. What would you like to discuss?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const q = text ?? input.trim();
    if (!q) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", text: q }];
    setMessages(newMessages);
    setTimeout(() => {
      const key = q.toLowerCase();
      const response = aiResponses[key] ?? aiResponses["default"];
      setMessages((m) => [...m, { role: "ai", text: response }]);
    }, 800);
  };

  return (
    <div className="pb-24 flex flex-col h-screen">
      <StatusBar />
      <BackHeader title="Pre-Consultation AI" subtitle="Dr. Priya Menon · Apr 10" />

      <div className="px-2 text-center mb-3">
        <p className="text-[9px] text-[#333] font-600 tracking-wider uppercase">NOT MEDICAL ADVICE · FOR CONSULTATION PREPARATION ONLY</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-[22px] space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] px-4 py-3 rounded-[14px] text-[12px] leading-relaxed"
              style={{
                background: msg.role === "user" ? "#D4A847" : "#0A0908",
                color: msg.role === "user" ? "#000" : "#CCC",
                border: msg.role === "ai" ? "0.5px solid #1A1710" : "none",
                whiteSpace: "pre-wrap",
              }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-[22px] mb-3 flex gap-2 overflow-x-auto no-scrollbar">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-600 text-[#888]"
            style={{ background: "#0A0908", border: "0.5px solid #1A1710" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-[22px] pb-2">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-[12px]"
          style={{ background: "#0D0B08", border: "0.5px solid #1A1710" }}>
          <input
            className="flex-1 bg-transparent text-[13px] text-white placeholder-[#333] outline-none"
            placeholder="Ask about your health data..."
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={() => send()}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ background: input ? "#D4A847" : "#1A1710" }}>
            <Send size={13} color={input ? "#000" : "#333"} strokeWidth={2} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
