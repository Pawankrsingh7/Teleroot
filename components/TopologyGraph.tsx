"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Router, Server, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "OLT-7", x: 50, y: 15, status: "healthy", latency: 12, load: 42, icon: Wifi },
  { label: "BNG-14", x: 17, y: 44, status: "healthy", latency: 18, load: 58, icon: Server },
  { label: "Core-01", x: 50, y: 49, status: "critical", latency: 86, load: 91, icon: Router, central: true },
  { label: "Edge-22", x: 83, y: 42, status: "healthy", latency: 21, load: 49, icon: Server },
  { label: "Hub-W18", x: 33, y: 82, status: "healthy", latency: 16, load: 36, icon: Server },
  { label: "Fraud-03", x: 70, y: 78, status: "warning", latency: 44, load: 73, icon: Activity }
];

const links = [
  { from: "OLT-7", to: "Core-01", utilization: 71, status: "healthy", duration: "2.8s" },
  { from: "BNG-14", to: "Core-01", utilization: 64, status: "healthy", duration: "3.2s" },
  { from: "Edge-22", to: "Core-01", utilization: 52, status: "healthy", duration: "3.6s" },
  { from: "Hub-W18", to: "Core-01", utilization: 39, status: "healthy", duration: "4s" },
  { from: "Fraud-03", to: "Core-01", utilization: 83, status: "warning", duration: "2.4s" }
];

const statusStyle = {
  critical: {
    dot: "bg-red-500",
    border: "border-red-500/35",
    fill: "#EF4444",
    line: "#EF4444",
    text: "text-red-400"
  },
  healthy: {
    dot: "bg-[#41bf63]",
    border: "border-[#41bf63]/30",
    fill: "#41bf63",
    line: "#41bf63",
    text: "text-[#41bf63]"
  },
  warning: {
    dot: "bg-orange-500",
    border: "border-orange-500/35",
    fill: "#F97316",
    line: "#F97316",
    text: "text-orange-400"
  }
};

export function TopologyGraph() {
  const [secondsAgo, setSecondsAgo] = useState(0);
  const byLabel = useMemo(() => Object.fromEntries(nodes.map((node) => [node.label, node])), []);
  const healthyNodes = nodes.filter((node) => node.status === "healthy").length;
  const riskyLinks = links.filter((link) => link.status !== "healthy").length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsAgo((value) => (value + 1) % 10);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-white/5 bg-white/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Healthy</p>
          <p className="mt-1 text-lg font-bold text-white">{healthyNodes}/6</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Risk Links</p>
          <p className="mt-1 text-lg font-bold text-white">{riskyLinks}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/5 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Core Load</p>
          <p className="mt-1 text-lg font-bold text-red-500">91%</p>
        </div>
      </div>

      <div className="relative mt-4 h-80 overflow-hidden rounded-xl border border-white/10 bg-[#0B0C10] p-3 shadow-inner shadow-[#41bf63]/10">
        <div className="absolute inset-3 rounded-lg border border-white/5 bg-[#13161F]/30" />
        <svg className="absolute inset-0 h-full w-full" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="4" id="topologyDots" patternUnits="userSpaceOnUse" width="4">
              <circle cx="1" cy="1" fill="#41bf63" opacity="0.22" r="0.22" />
            </pattern>
            <radialGradient cx="50%" cy="50%" id="topologyGlow" r="55%">
              <stop offset="0%" stopColor="#41bf63" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0B0C10" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#topologyDots)" height="100" width="100" />
          <rect fill="url(#topologyGlow)" height="100" width="100" />
          {links.map((link) => {
            const from = byLabel[link.from];
            const to = byLabel[link.to];
            const tone = statusStyle[link.status as keyof typeof statusStyle];

            return (
              <g key={`${link.from}-${link.to}`}>
                <line
                  stroke={tone.line}
                  strokeDasharray="2.4 2.4"
                  strokeLinecap="round"
                  strokeOpacity="0.58"
                  strokeWidth="1.3"
                  x1={from.x}
                  x2={to.x}
                  y1={from.y}
                  y2={to.y}
                />
                <circle fill={tone.fill} r="1.1">
                  <animate attributeName="cx" dur={link.duration} repeatCount="indefinite" values={`${from.x};${to.x}`} />
                  <animate attributeName="cy" dur={link.duration} repeatCount="indefinite" values={`${from.y};${to.y}`} />
                </circle>
              </g>
            );
          })}
        </svg>
        {nodes.map((node) => {
          const tone = statusStyle[node.status as keyof typeof statusStyle];
          const Icon = node.icon;

          return (
            <div
              key={node.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={cn(
                "rounded-xl border bg-[#13161F]/95 px-3 py-2 text-center shadow-2xl backdrop-blur-sm",
                node.central ? "min-w-[92px]" : "min-w-[76px]",
                tone.border
              )}>
                <div className="flex items-center justify-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]", tone.dot, tone.text)} />
                  <Icon className={cn("h-3.5 w-3.5", tone.text)} />
                </div>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-white">{node.label}</p>
                <p className="text-[8px] font-bold uppercase tracking-tighter text-slate-500">
                  {node.latency}ms / {node.load}%
                </p>
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/5 bg-[#0B0C10]/80 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 backdrop-blur-sm">
          <span>Dot topology</span>
          <span>Updated {secondsAgo}s ago</span>
        </div>
      </div>
    </div>
  );
}
