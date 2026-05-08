"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Clock3,
  Filter,
  Flame,
  Gauge,
  MessageSquare,
  MoreHorizontal,
  Search,
  SendHorizonal,
  Server,
  ShieldCheck,
  Siren,
  Ticket,
  TriangleAlert,
  UserRound
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Alerts", value: "68", icon: Bell },
  { label: "Open", value: "43", icon: Siren },
  { label: "Acknowledged", value: "15", icon: Ticket },
  { label: "Critical", value: "21", icon: TriangleAlert },
  { label: "Major", value: "28", icon: Flame },
  { label: "Successes", value: "38", icon: ShieldCheck }
];

const alerts = [
  { id: "#1037", severity: "Critical", incident: "Node Down", node: "Router R1", issue: "Node Down", rca: "Link", team: "NOC", status: "Open" },
  { id: "#1051", severity: "Major", incident: "Gore Besalte", node: "Core Switch", issue: "Loss of Signal", rca: "-", team: "SysOps", status: "Open" },
  { id: "#1018", severity: "Major", incident: "Core Switch", node: "Server", issue: "Interface Down", rca: "-", team: "SysOps", status: "Open" },
  { id: "#1018", severity: "Critical", incident: "Disk Space Low", node: "Router", issue: "Disk Space Low", rca: "-", team: "SysOps", status: "Open" }
];

const openAlerts = [
  { id: "#1032", severity: "Critical", incident: "Gore Router", device: "Router R1", issue: "Node Down", team: "NOC" },
  { id: "#1027", severity: "Critical", incident: "Core Switch", device: "Server", issue: "Interface Down", team: "SysOps" },
  { id: "#1018", severity: "Major", incident: "Switch", device: "Server R1", issue: "Loss of Signal", team: "SysOps" },
  { id: "#1017", severity: "Major", incident: "Router SSPP Adj. Down", device: "Router R1", issue: "Fiber Degradation", team: "SysOps" }
];

function AlertKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
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
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#41bf63] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const critical = severity === "Critical";

  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${
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
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-xs font-bold text-slate-200 transition-all hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"
      type="button"
    >
      {children}
    </button>
  );
}

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => (
            <AlertKpiCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                <div>
                  <h2 className="text-base font-bold text-white">Incident Summary</h2>
                  <p className="text-[11px] font-semibold text-slate-500">Live incident load, impact, ownership, and escalation state.</p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
              </div>
              <div className="grid gap-0 divide-y divide-white/5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:divide-white/5 xl:grid-cols-5">
                {[
                  ["Ongoing Incidents", "5", "Active cases", Siren, "border-red-500/20 bg-red-500/10 text-red-400"],
                  ["Top Issue", "Node Down", "Most repeated", TriangleAlert, "border-orange-500/20 bg-orange-500/10 text-orange-400"],
                  ["Major Impact", "21", "Affected alerts", Flame, "border-rose-500/20 bg-rose-500/10 text-rose-400"],
                  ["Avg BSSA", "22", "Score index", Gauge, "border-[#41bf63]/20 bg-[#41bf63]/10 text-[#41bf63]"],
                  ["Avg Response", "15 min", "Team SLA", Clock3, "border-[#41bf63]/20 bg-[#41bf63]/10 text-[#41bf63]"]
                ].map(([label, value, helper, Icon, tone]) => {
                  const SummaryIcon = Icon as typeof Siren;

                  return (
                    <div className="bg-[#13161F] px-3 py-2" key={label as string}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-[9px] font-bold uppercase leading-tight tracking-wide text-slate-500">{label as string}</p>
                          <p className="mt-1 truncate text-lg font-bold leading-none text-white">{value as string}</p>
                          <p className="mt-0.5 truncate text-[10px] font-semibold leading-tight text-slate-500">{helper as string}</p>
                        </div>
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${tone as string}`}>
                          <SummaryIcon className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-2 border-t border-white/5 bg-[#1a1e29]/30 px-3 py-2 md:grid-cols-3">
                {[
                  ["Primary team", "NOC", Server],
                  ["Escalation", "SysOps ready", UserRound],
                  ["Status", "Ongoing", Ticket]
                ].map(([label, value, Icon]) => {
                  const DetailIcon = Icon as typeof Server;

                  return (
                    <div className="flex min-w-0 items-center gap-2 rounded-md border border-white/5 bg-white/5 px-2.5 py-1.5" key={label as string}>
                      <DetailIcon className="h-3.5 w-3.5 shrink-0 text-[#41bf63]" />
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-bold uppercase tracking-wide text-slate-500">{label as string}</p>
                        <p className="truncate text-xs font-bold text-white">{value as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Alerts Activity</h2>
                    <span className="rounded-full border border-[#41bf63]/25 bg-[#41bf63]/10 px-2 py-0.5 text-xs font-bold text-[#41bf63]">Live</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <MiniButton>Servers</MiniButton>
                    <MiniButton>Last 24 hours <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                    <MiniButton>Time</MiniButton>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                  <MiniButton>Status <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Device <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Assigned Team <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Group By</MiniButton>
                  <span className="rounded-md border border-[#41bf63]/30 bg-[#41bf63]/10 px-2.5 py-1 text-xs font-bold text-[#41bf63]">
                    Clusters
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-xs">
                  <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                    <tr>
                      {["ID", "Severity", "Incident", "Affected Node", "Issue", "RCA", "Assigned Team", "Status"].map((head) => (
                        <th className="px-3 py-2 font-bold" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="bg-[#41bf63]/5">
                      <td className="px-3 py-3 font-bold text-white">#1033</td>
                      <td className="px-3 py-3"><SeverityBadge severity="Critical" /></td>
                      <td className="px-3 py-3 font-bold text-white">Router R1</td>
                      <td className="px-3 py-3 font-semibold text-white">Router R1</td>
                      <td className="px-3 py-3 font-semibold text-white">Node Down</td>
                      <td className="px-3 py-3 font-bold text-red-400">Link</td>
                      <td className="px-3 py-3 font-bold text-orange-400">NOC</td>
                      <td className="px-3 py-3 font-bold text-orange-400">Open</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3" />
                      <td className="px-3 py-3">
                        <span className="rounded-md border border-white/5 bg-white/5 px-3 py-2 text-xs font-bold text-white shadow-sm">
                          Cluster #2005
                        </span>
                      </td>
                      <td className="px-3 py-3" colSpan={6}>
                        <div className="relative h-9 rounded-md bg-[#1a1e29]/40">
                          <span className="absolute left-0 right-0 top-1/2 h-px bg-[#41bf63]/30" />
                          <span className="absolute left-[22%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-green-500" />
                          <span className="absolute left-[53%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
                          <span className="absolute left-[70%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                          <span className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500" />
                        </div>
                      </td>
                    </tr>
                    {alerts.map((alert, index) => (
                      <tr className="transition hover:bg-[#1a1e29]/40" key={`${alert.id}-${index}`}>
                        <td className="px-3 py-2 font-bold text-white">{alert.id}</td>
                        <td className="px-3 py-2"><SeverityBadge severity={alert.severity} /></td>
                        <td className="px-3 py-2 font-semibold text-white">{alert.incident}</td>
                        <td className="px-3 py-2 font-semibold text-white">{alert.node}</td>
                        <td className="px-3 py-2 font-semibold text-white">{alert.issue}</td>
                        <td className="px-3 py-2 font-semibold text-slate-400">{alert.rca}</td>
                        <td className="px-3 py-2 font-semibold text-white">{alert.team}</td>
                        <td className="px-3 py-2 font-bold text-orange-400">{alert.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 p-3">
                <h2 className="text-lg font-bold text-white">Open Alerts (43)</h2>
                <div className="flex gap-2">
                  <MiniButton>Now <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                  <MiniButton>Filter <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] table-fixed text-left text-xs">
                  <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                    <tr>
                      {["ID", "Severity", "Incident", "Device", "Issue", "RCA", "Assigned Team", "Status"].map((head) => (
                        <th className="px-2 py-2 font-bold" key={head}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {openAlerts.map((alert) => (
                      <tr className="hover:bg-[#1a1e29]/40" key={alert.id}>
                        <td className="px-2 py-2 font-bold text-white">{alert.id}</td>
                        <td className="px-2 py-2"><SeverityBadge severity={alert.severity} /></td>
                        <td className="px-2 py-2 font-semibold text-white">{alert.incident}</td>
                        <td className="px-2 py-2 font-semibold text-white">{alert.device}</td>
                        <td className="px-2 py-2 font-bold text-orange-400">{alert.issue}</td>
                        <td className="px-2 py-2 font-semibold text-red-400">Alert</td>
                        <td className="px-2 py-2 font-semibold text-white">{alert.team}</td>
                        <td className="px-2 py-2 font-bold text-orange-400">Open</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 p-4">
                <h2 className="text-lg font-bold text-white">Incident Details</h2>
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-400">Cluster ID <span className="text-xl font-bold text-white">#2005</span></p>
                <div className="mt-3 rounded-lg border border-white/5 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">Today 10:32 AM</p>
                  <p className="mt-1 text-sm font-bold text-orange-400">Status: Ongoing</p>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-white">Root Cause Identified:</p>
                  <div className="mt-3 rounded-lg border border-white/5 bg-[#1a1e29]/40 p-3 text-sm font-bold text-white">
                    Router R1
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-white">Impacted Nodes:</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["Fieer Link A-B", "Switch-S2"].map((node) => (
                      <span className="rounded-lg border border-white/5 bg-white/5 p-2 text-xs font-bold text-white" key={node}>
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="h-10 rounded-lg bg-orange-500 text-sm font-bold text-white hover:bg-orange-600" type="button">
                    ACKNOWLEDGE
                  </button>
                  <button className="h-10 rounded-lg bg-[#41bf63] text-sm font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" type="button">
                    RESOLVE
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 p-4">
                <h2 className="text-lg font-bold text-white">Activity Timeline</h2>
                <MoreHorizontal className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-4 p-4">
                {[
                  ["Frank (SysOps Lead)", "8m ago", "Acknowledged #2005, investigating root cause ...", UserRound],
                  ["Jien Ticket Created", "6th stage", "Ticket linked to cluster #2005", Ticket],
                  ["Alert Cluster Created", "7m ago", "Related alerts grouped automatically", Bell]
                ].map(([title, meta, body, Icon], index) => {
                  const TimelineIcon = Icon as typeof UserRound;

                  return (
                    <div className="relative flex gap-3" key={title as string}>
                      {index < 2 && <span className="absolute left-4 top-9 h-full border-l border-dashed border-white/10" />}
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#41bf63] text-[#0B0C10]">
                        <TimelineIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">{title as string}</p>
                        <p className="text-xs font-bold text-slate-500">{meta as string}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-400">{body as string}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="relative mt-2">
                  <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-10 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                    placeholder="Comment..."
                  />
                  <SendHorizonal className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#41bf63]" />
                </div>
              </div>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}
