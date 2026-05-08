"use client";

import { useState } from "react";
import { playbooks } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PlaybooksCard() {
  const [items, setItems] = useState(playbooks);

  function togglePlaybook(title: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.title === title
          ? {
              ...item,
              enabled: !item.enabled,
              status: item.enabled ? "Paused" : "Ready"
            }
          : item
      )
    );
  }

  return (
    <div className="space-y-3">
      {items.map((playbook) => (
        <div
          key={playbook.title}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-[#41bf63]/30 group"
        >
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-white tracking-wide">{playbook.title}</p>
            <p className="mt-1 truncate text-[10px] font-bold text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-widest">{playbook.action}</p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Badge tone={playbook.enabled ? "success" : "warning"}>
              {playbook.status}
            </Badge>
            <button
              aria-pressed={playbook.enabled}
              aria-label={`${playbook.title} toggle`}
              className={cn(
                "relative h-5 w-9 rounded-full border transition-all duration-300",
                playbook.enabled ? "border-[#41bf63]/50 bg-[#41bf63]/20" : "border-white/10 bg-white/5"
              )}
              onClick={() => togglePlaybook(playbook.title)}
              type="button"
            >
              <span
                className={cn(
                  "absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all duration-300 shadow-xl",
                  playbook.enabled ? "left-5 bg-[#41bf63]" : "left-0.5 bg-slate-600"
                )}
              />
            </button>
          </div>
        </div>
      ))}
      <button className="w-full mt-2 text-center text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors py-2">
        View all playbooks →
      </button>
    </div>
  );
}
