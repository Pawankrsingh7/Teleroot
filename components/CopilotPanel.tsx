"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CopilotPanel() {
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  function submitMessage() {
    const nextMessage = message.trim();

    if (!nextMessage) {
      return;
    }

    setNotes((currentNotes) => [nextMessage, ...currentNotes].slice(0, 3));
    setMessage("");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-[#41bf63]/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Issue detected</p>
          <p className="mt-1.5 text-sm font-bold text-white tracking-wide">Core-RTR-01 shows sustained packet loss.</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-[#41bf63]/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Impact</p>
          <p className="mt-1.5 text-sm font-bold text-white tracking-wide">West metro traffic may see elevated latency.</p>
        </div>
        <div className="rounded-xl border border-[#41bf63]/20 bg-[#41bf63]/5 p-4 transition-all duration-300 hover:border-[#41bf63]/40">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#41bf63]">Suggested action</p>
          <p className="mt-1.5 text-sm font-bold text-white tracking-wide">Execute BGP peer reset and reroute playbook.</p>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="rounded-xl border border-[#41bf63]/10 bg-[#41bf63]/5 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#41bf63]">Operator notes</p>
          <div className="mt-3 space-y-2">
            {notes.map((note) => (
              <p className="rounded-lg bg-[#1a1e29] border border-white/5 px-3 py-2.5 text-xs font-bold text-white shadow-xl" key={note}>
                {note}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Input
          className="h-12 border-white/5 bg-[#1a1e29] px-4 font-bold text-white placeholder:text-slate-500 focus:border-[#41bf63]/50 focus:ring-0 rounded-xl transition-all"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitMessage();
            }
          }}
          placeholder="Ask Copilot or add operator note..."
          value={message}
        />
        <Button
          className="h-12 w-full bg-[#41bf63] text-black hover:bg-[#41bf63]/90 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(65,191,99,0.2)]"
          onClick={submitMessage}
          type="button"
        >
          <SendHorizonal className="h-4 w-4" />
          Execute Resolution
        </Button>
      </div>
    </div>
  );
}
