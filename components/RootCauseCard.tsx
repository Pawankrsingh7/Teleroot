import { CheckCircle2, Router, Server, TriangleAlert } from "lucide-react";

const evidenceNodes = [
  { label: "Switch A", x: 21, y: 70, status: "good", icon: Server, meta: "healthy path" },
  { label: "CPU Spike", x: 50, y: 18, status: "warn", icon: TriangleAlert, meta: "signal" },
  { label: "Core-RTR-01", x: 50, y: 50, status: "bad", icon: Router, meta: "root cause", central: true },
  { label: "API Edge", x: 80, y: 32, status: "bad", icon: Server, meta: "impacted" },
  { label: "Metro West", x: 82, y: 76, status: "bad", icon: Server, meta: "impacted" }
];

const statusStyle = {
  good: { dot: "bg-[#41bf63]", border: "border-[#41bf63]/30", line: "#41bf63", text: "text-[#41bf63]" },
  warn: { dot: "bg-orange-500", border: "border-orange-500/35", line: "#F97316", text: "text-orange-400" },
  bad: { dot: "bg-red-500", border: "border-red-500/35", line: "#EF4444", text: "text-red-400" }
};

export function RootCauseCard() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          Core-RTR-01
        </span>
        <span className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-black text-red-500 uppercase tracking-widest">
          3 services impacted
        </span>
        <span className="rounded-lg border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          8 evidence signals
        </span>
      </div>

      <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-white/10 bg-[#0B0C10] p-3 shadow-inner shadow-[#41bf63]/10">
        <div className="absolute inset-3 rounded-lg border border-white/5 bg-[#13161F]/30" />
        <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="4" id="rcaDots" patternUnits="userSpaceOnUse" width="4">
              <circle cx="1" cy="1" fill="#41bf63" opacity="0.22" r="0.22" />
            </pattern>
            <radialGradient cx="50%" cy="50%" id="rcaGlow" r="58%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.11" />
              <stop offset="100%" stopColor="#0B0C10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#rcaDots)" height="100" width="100" />
          <rect fill="url(#rcaGlow)" height="100" width="100" />
          <path d="M 21 70 C 35 58, 38 50, 50 50" fill="none" stroke="#41bf63" strokeDasharray="2.4 2.4" strokeOpacity="0.62" strokeWidth="1.45" />
          <path d="M 50 50 C 62 50, 68 42, 80 32" fill="none" stroke="#EF4444" strokeDasharray="2.4 2.4" strokeOpacity="0.7" strokeWidth="1.45" />
          <path d="M 50 50 C 63 58, 69 68, 82 76" fill="none" stroke="#EF4444" strokeDasharray="2.4 2.4" strokeOpacity="0.7" strokeWidth="1.45" />
          <path d="M 50 50 C 48 36, 46 28, 50 18" fill="none" stroke="#F97316" strokeDasharray="2.4 2.4" strokeOpacity="0.64" strokeWidth="1.45" />
          <circle fill="#41bf63" r="1.2">
            <animateMotion dur="2.6s" path="M 21 70 C 35 58, 38 50, 50 50" repeatCount="indefinite" />
          </circle>
          <circle fill="#EF4444" r="1.2">
            <animateMotion dur="2.2s" path="M 50 50 C 62 50, 68 42, 80 32" repeatCount="indefinite" />
          </circle>
          <circle fill="#EF4444" r="1.2">
            <animateMotion dur="2.4s" path="M 50 50 C 63 58, 69 68, 82 76" repeatCount="indefinite" />
          </circle>
        </svg>

        {evidenceNodes.map((node) => {
          const tone = statusStyle[node.status as keyof typeof statusStyle];
          const Icon = node.icon;

          return (
            <div
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              key={node.label}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`rounded-xl border bg-[#13161F]/95 px-2.5 py-2 text-center shadow-2xl backdrop-blur-sm ${tone.border} ${node.central ? "min-w-[92px]" : "min-w-[78px]"}`}>
                <div className="flex items-center justify-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                  <Icon className={`h-3.5 w-3.5 ${tone.text}`} />
                </div>
                <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-white">{node.label}</p>
                <p className="text-[8px] font-bold uppercase tracking-tighter text-slate-500">{node.meta}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-[#41bf63]/20 bg-[#41bf63]/5 p-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#41bf63]/10 flex items-center justify-center border border-[#41bf63]/20">
            <CheckCircle2 className="h-4 w-4 text-[#41bf63]" />
          </div>
          <div>
            <p className="text-[11px] font-black text-white uppercase tracking-wider">Suggested fix: Restart BGP peer on Core-RTR-01.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
