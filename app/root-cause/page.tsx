"use client";

import { useState } from "react";
import {
  Bell,
  BrainCircuit,
  ChevronDown,
  Clock3,
  Filter,
  GitBranch,
  MoreHorizontal,
  Network,
  Play,
  Router,
  Search,
  Server,
  ShieldCheck,
  Siren,
  Sparkles,
  TriangleAlert,
  UsersRound,
  Zap
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const summaryMetrics = [
  { label: "Current", value: "7", helper: "active RCA cases", icon: Network },
  { label: "Today's", value: "16", helper: "clusters analyzed", icon: Bell },
  { label: "Success Rate", value: "88%", helper: "auto diagnosis", icon: ShieldCheck },
  { label: "Avg Time", value: "5 min", helper: "to root cause", icon: Clock3 },
  { label: "Affected Services", value: "3", helper: "service impact", icon: Siren }
];

function RcaKpiCard({ metric }: { metric: (typeof summaryMetrics)[number] }) {
  const Icon = metric.icon;

  return (
    <div className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/8 bg-[#13161F] px-4 py-3 transition-all duration-200 hover:border-[#41bf63]/30 hover:bg-[#1a1e29]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-[#41bf63]/30">
        <Icon className="h-[18px] w-[18px] text-[#41bf63]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[11px] font-semibold uppercase leading-none tracking-wider text-slate-400">
          {metric.label}
        </span>
        <span className="text-2xl font-black leading-tight tracking-tight text-white">
          {metric.value}
        </span>
        <span className="truncate text-[10px] font-bold leading-none text-slate-500">
          {metric.helper}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#41bf63] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

const impactedServices = [
  ["Internet Gateway", "Degraded", "w-[82%]", "bg-[#41bf63]"],
  ["VoIP Service", "Unavailable", "w-[58%]", "bg-orange-400"],
  ["Internal IT Apps", "Disrupted", "w-[64%]", "bg-yellow-400"]
];

const impactRows = [
  ["Fiber Link A-B", "Degraded", "text-orange-400"],
  ["Internet Gateway", "Service Down", "text-red-400"],
  ["Switch S2", "Disrupted", "text-orange-400"],
  ["VoIP Service", "Unavailable", "text-red-400"]
];

const activityRows = [
  ["#1023", "Critical", "RCA Engine identified root cause: Router R1", "1 min ago", "NOC", "Open"],
  ["#1021", "Critical", "15 alerts detected from log anomalies", "5 min ago", "NOC", "Open"],
  ["#1018", "Major", "Dependency path traced to Node R1", "6 min ago", "NOC", "Open"],
  ["#1016", "Critical", "All logs ingested from cluster #2005", "7 min ago", "NOC", "Open"]
];

function SeverityPill({ severity }: { severity: string }) {
  const critical = severity === "Critical";

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-bold ${
        critical ? "border-red-500/25 bg-red-500/10 text-red-400" : "border-orange-500/25 bg-orange-500/10 text-orange-400"
      }`}
    >
      {severity}
    </span>
  );
}

function MiniButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-xs font-bold text-slate-200 transition hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"
      type="button"
    >
      {children}
    </button>
  );
}

function RcaMap() {
  const rcaNodes = [
    { label: "Cluster-1", meta: "5 major", x: 20, y: 24, status: "warning", icon: GitBranch },
    { label: "Cluster-2", meta: "12 critical", x: 20, y: 50, status: "critical", icon: GitBranch },
    { label: "Cluster-5", meta: "3 minor", x: 20, y: 73, status: "warning", icon: GitBranch },
    { label: "Router R1", meta: "root cause", x: 50, y: 50, status: "critical", icon: Router, central: true },
    { label: "Switch S2", meta: "healthy", x: 80, y: 24, status: "healthy", icon: Server },
    { label: "Gateway", meta: "down", x: 80, y: 50, status: "critical", icon: Network },
    { label: "VoIP", meta: "degraded", x: 80, y: 73, status: "warning", icon: Server }
  ];

  const rcaLinks = [
    { from: rcaNodes[0], to: rcaNodes[3], status: "warning", label: "71%", duration: "3s" },
    { from: rcaNodes[1], to: rcaNodes[3], status: "critical", label: "94%", duration: "2.2s" },
    { from: rcaNodes[2], to: rcaNodes[3], status: "warning", label: "52%", duration: "3.4s" },
    { from: rcaNodes[3], to: rcaNodes[4], status: "healthy", label: "21ms", duration: "3.1s" },
    { from: rcaNodes[3], to: rcaNodes[5], status: "critical", label: "down", duration: "2.1s" },
    { from: rcaNodes[3], to: rcaNodes[6], status: "warning", label: "63%", duration: "3.3s" }
  ];

  const styles = {
    critical: { bg: "bg-red-500", line: "#DC2626", fill: "#DC2626", text: "text-danger" },
    healthy: { bg: "bg-[#41bf63]", line: "#16A34A", fill: "#16A34A", text: "text-success" },
    warning: { bg: "bg-orange-400", line: "#D97706", fill: "#D97706", text: "text-warning" }
  };

  return (
    <div className="rounded-lg border border-white/5 bg-[#13161F] p-5 text-white shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Real-time RCA Topology</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Root cause path, impacted services, and alarm cluster flow</p>
        </div>
        <div className="rounded-md border border-[#41bf63]/30 bg-[#41bf63]/10 px-3 py-1 text-xs font-bold text-[#41bf63]">
          Live 12s
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/5 bg-white/5 p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Clusters</p>
          <p className="mt-1 text-lg font-bold text-white">3</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/5 p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Root Confidence</p>
          <p className="mt-1 text-lg font-bold text-red-400">90%</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/5 p-2">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Impacted</p>
          <p className="mt-1 text-lg font-bold text-white">3</p>
        </div>
      </div>

      <div className="relative mt-4 h-[420px] isolate overflow-hidden rounded-lg border border-white/5 bg-[#0B0C10]">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" role="img" viewBox="0 0 100 100">
          <defs>
            <pattern height="10" id="rootCauseGrid" patternUnits="userSpaceOnUse" width="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.42" />
            </pattern>
            <pattern height="5" id="rootCauseDots" patternUnits="userSpaceOnUse" width="5">
              <circle cx="1" cy="1" fill="#41bf63" opacity="0.32" r="0.22" />
            </pattern>
            <radialGradient cx="50%" cy="48%" id="rootCauseWash" r="58%">
              <stop offset="0%" stopColor="#41bf63" stopOpacity="0.12" />
              <stop offset="48%" stopColor="#13161F" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#0B0C10" stopOpacity="0.96" />
            </radialGradient>
            <linearGradient id="rootCausePanelShade" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#41bf63" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect fill="url(#rootCauseWash)" height="100" width="100" />
          <rect fill="url(#rootCauseGrid)" height="100" opacity="0.9" width="100" />
          <rect fill="url(#rootCauseDots)" height="100" opacity="0.65" width="100" />
          <rect fill="url(#rootCausePanelShade)" height="100" width="100" />
          {rcaLinks.map((link) => {
            const tone = styles[link.status as keyof typeof styles];
            const isCritical = link.status === "critical";
            return (
              <g key={`${link.from.label}-${link.to.label}`}>
                <line
                  className="topology-link"
                  stroke={tone.line}
                  strokeLinecap="round"
                  strokeOpacity={isCritical ? "0.62" : "0.42"}
                  strokeWidth={isCritical ? "1.8" : "1.35"}
                  x1={link.from.x}
                  x2={link.to.x}
                  y1={link.from.y}
                  y2={link.to.y}
                />
                <circle fill={tone.fill} r={isCritical ? "1.35" : "1.1"}>
                  <animate attributeName="cx" dur={link.duration} repeatCount="indefinite" values={`${link.from.x};${link.to.x}`} />
                  <animate attributeName="cy" dur={link.duration} repeatCount="indefinite" values={`${link.from.y};${link.to.y}`} />
                </circle>
                <text
                  fill="#E2E8F0"
                  fontSize="2.6"
                  fontWeight="700"
                  textAnchor="middle"
                  x={(link.from.x + link.to.x) / 2}
                  y={(link.from.y + link.to.y) / 2 - 2}
                >
                  {link.label}
                </text>
              </g>
            );
          })}
        </svg>

        {rcaNodes.map((node) => {
          const tone = styles[node.status as keyof typeof styles];
          const NodeIcon = node.icon;

          return (
            <div
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              key={node.label}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="relative">
                <span className={`topology-pulse absolute inset-0 rounded-full ${tone.bg}`} />
                <span
                  className={`relative flex items-center justify-center rounded-full border-2 border-white/20 bg-[#13161F] shadow-md ${
                    node.central ? "h-14 w-14" : "h-11 w-11"
                  }`}
                >
                  <NodeIcon className={`h-5 w-5 ${tone.text}`} />
                </span>
              </div>
              <div className="min-w-[86px] rounded-md border border-white/10 bg-[#13161F]/95 px-2 py-1 text-center text-[11px] font-bold leading-tight text-white shadow-sm">
                <p>{node.label}</p>
                <p className="text-[10px] font-semibold text-slate-500">{node.meta}</p>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center gap-3 rounded-md border border-white/10 bg-[#13161F]/95 px-3 py-2 text-[11px] font-bold text-slate-300 shadow-sm">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#41bf63]" /> Healthy</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> Warning</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Critical</span>
          <span className="ml-auto text-slate-500">Updated 12s ago</span>
        </div>
      </div>
    </div>
  );
}

export default function RootCausePage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-[#41bf63]/20 bg-[#41bf63]/10 text-[#41bf63]">
                <BrainCircuit className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">RCA Command View</h2>
                <p className="text-sm font-semibold text-slate-500">Cluster #2005, automated diagnosis, and service impact.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">Critical</span>
              <span className="rounded-md border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1 text-xs font-bold text-[#41bf63]">90% Confidence</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">Updated 12s ago</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {summaryMetrics.map((metric) => (
            <RcaKpiCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <h2 className="text-base font-bold text-white">Incident Details</h2>
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Cluster ID</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xl font-bold text-white">#2005</span>
                    <SeverityPill severity="Critical" />
                  </div>
                </div>
                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold text-slate-300">ID #1023</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-md border border-white/5 bg-white/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Dependency Chain</p>
                  <p className="mt-1 text-sm font-bold text-white">Fiber Link A-B / Switch S2</p>
                </div>
                <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-400">Failed Node</p>
                  <p className="mt-1 text-sm font-bold text-white">Router R1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <h2 className="text-base font-bold text-white">Impact Analysis</h2>
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 rounded-md border border-orange-500/20 bg-orange-500/10 p-3">
                <Zap className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm font-bold text-white">Route dependency degraded</p>
                  <p className="text-xs font-semibold text-orange-400">4 downstream objects affected</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {impactRows.map(([name, status, color]) => (
                  <div className="rounded-md border border-white/5 bg-white/5 px-3 py-2" key={name}>
                    <p className="text-xs font-bold text-white">{name}</p>
                    <p className={`mt-0.5 text-[11px] font-bold ${color}`}>{status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="border-b border-white/5 px-4 py-3">
              <h2 className="text-base font-bold text-white">Suggested Action</h2>
            </div>
            <div className="p-4">
              <div className="rounded-md border border-[#41bf63]/20 bg-[#41bf63]/10 p-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-[#41bf63]" />
                  <div>
                    <p className="text-sm font-bold text-white">Restart Router R1</p>
                    <p className="text-xs font-semibold text-[#41bf63]">Confidence: 90%</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Fiber Link A-B", "Switch S2"].map((node) => (
                  <span className="rounded-md border border-white/5 bg-white/5 px-2 py-2 text-xs font-bold text-white" key={node}>
                    {node}
                  </span>
                ))}
              </div>
              <button className="mt-3 h-10 w-full rounded-lg bg-[#41bf63] text-sm font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" type="button">
                Execute Action
              </button>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <RcaMap />
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 px-4 py-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white">RCA Timeline</h2>
              </div>
              <div className="space-y-4 p-4">
                {[
                  ["RCA engine identified Router R1", "1 min ago"],
                  ["13 alerts detected from log anomalies", "3 min ago"],
                  ["Dependency path traced to Node R1", "7 min ago"]
                ].map(([title, time], index) => (
                  <div className="relative flex gap-3" key={title}>
                    {index < 2 && <span className="absolute left-3 top-7 h-full border-l border-dashed border-white/10" />}
                    <span className="relative z-10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#41bf63] text-[#0B0C10]">
                      <Play className="h-3 w-3" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="text-xs font-semibold text-slate-500">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 px-4 py-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white">Impacted Services</h2>
              </div>
              <div className="space-y-2 p-4">
                {impactedServices.map(([service, status, width, color]) => (
                  <div className="rounded-md border border-white/5 bg-white/5 p-2" key={service}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-white">{service}</span>
                      <span className="text-slate-500">{status}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span className={`block h-full rounded-full ${width} ${color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
          <div className="flex flex-col gap-3 border-b border-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <span className="rounded-md bg-[#41bf63] px-3 py-1 text-xs font-bold text-[#0B0C10]">RCA Activity</span>
              <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-300">Model Output</span>
            </div>
            <div className="flex gap-2">
              <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
              <MiniButton>Latest <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                <tr>
                  {["ID", "Severity", "Incident", "Issue", "Assigned Team", "Status"].map((head) => (
                    <th className="px-3 py-2 font-bold" key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activityRows.map(([id, severity, incident, issue, team, status]) => (
                  <tr className="hover:bg-white/[0.02]" key={`${id}-${issue}`}>
                    <td className="px-3 py-2 font-bold text-white">{id}</td>
                    <td className="px-3 py-2"><SeverityPill severity={severity} /></td>
                    <td className="px-3 py-2 font-semibold text-white">{incident}</td>
                    <td className="px-3 py-2 font-semibold text-slate-400">{issue}</td>
                    <td className="px-3 py-2 font-bold text-white">{team}</td>
                    <td className="px-3 py-2 font-bold text-orange-400">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
