"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Filter,
  Gauge,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Route,
  Search,
  Settings,
  Signal,
  SlidersHorizontal,
  Sparkles,
  Timer,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Optimization Score", value: "91.8%", delta: "+4.2%", icon: Gauge },
  { label: "Traffic Savings", value: "18.4%", delta: "+2.1%", icon: Route },
  { label: "Congested Links", value: "7", delta: "-3 today", icon: Signal },
  { label: "Pending Actions", value: "12", delta: "5 auto", icon: Sparkles },
  { label: "Avg Plan Time", value: "1.7 min", delta: "-18%", icon: Timer }
];

const recommendations = [
  { id: "OPT-2201", title: "Reroute BGP edge traffic", domain: "Routing", status: "Ready", impact: "High", saving: "12.5%", confidence: 94, region: "US-West", window: "Now" },
  { id: "OPT-2207", title: "Shift load to low-utilization carrier", domain: "Capacity", status: "Running", impact: "Medium", saving: "8.1%", confidence: 88, region: "Central", window: "14 min" },
  { id: "OPT-2214", title: "Tune fiber path protection", domain: "Fiber", status: "Review", impact: "High", saving: "10.2%", confidence: 82, region: "US-East", window: "1h" },
  { id: "OPT-2220", title: "Reduce duplicate telemetry polling", domain: "Compute", status: "Ready", impact: "Low", saving: "4.8%", confidence: 91, region: "Global", window: "Today" },
  { id: "OPT-2233", title: "Rebalance fraud inspection queue", domain: "Security", status: "Queued", impact: "Medium", saving: "6.7%", confidence: 86, region: "Central", window: "34 min" }
];

function OptimizationKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
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
        <span className="truncate text-[10px] font-bold leading-none text-[#41bf63]">
          {metric.delta}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#41bf63] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

function MiniButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 text-xs font-bold text-slate-200 transition hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Ready" || status === "Applied" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Running" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Review" ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-300" : "border-white/10 bg-white/5 text-slate-300";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function OptimizationPage() {
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(recommendations[0].id);
  const [tick, setTick] = useState(0);
  const [autoApply, setAutoApply] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesQuery = `${item.id} ${item.title} ${item.domain} ${item.region}`.toLowerCase().includes(query.toLowerCase());
      const matchesDomain = domainFilter === "All" || item.domain === domainFilter;
      return matchesQuery && matchesDomain;
    });
  }, [query, domainFilter]);

  const selectedRecommendation = recommendations.find((item) => item.id === selectedId) ?? recommendations[0];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1fr)_150px]">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {metrics.map((metric) => (
              <OptimizationKpiCard key={metric.label} metric={metric} />
            ))}
          </div>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#41bf63] px-3 text-xs font-bold text-[#0B0C10] shadow-xl hover:bg-[#6ee7a0]" type="button">
            <Plus className="h-3.5 w-3.5" /> New Plan
          </button>
        </section>

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Optimization Control Center</h2>
              <p className="text-sm font-semibold text-slate-500">Prioritize routing, capacity, compute, and policy changes with measurable operational impact.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MiniButton><RefreshCw className="h-3.5 w-3.5" /> Recalculate</MiniButton>
              <MiniButton><SlidersHorizontal className="h-3.5 w-3.5" /> Constraints</MiniButton>
              <button
                className={`inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-bold ${autoApply ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : "border-white/10 bg-white/5 text-slate-300"}`}
                onClick={() => setAutoApply((value) => !value)}
                type="button"
              >
                Auto Apply {autoApply ? "On" : "Off"}
              </button>
              <span className="rounded-md border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1 text-xs font-bold text-[#41bf63]">Live {tick % 60}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 p-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Traffic Efficiency Trend</h3>
                    <p className="text-xs font-semibold text-slate-500">Savings and congestion movement by planning window.</p>
                  </div>
                  <MiniButton>24 Hours <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
                </div>
                <div className="h-72 p-4">
                  <div className="relative h-full overflow-hidden rounded-lg border border-white/5 bg-[#0B0C10]">
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <pattern height="10" id="optimizationGrid" patternUnits="userSpaceOnUse" width="10">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.35" />
                        </pattern>
                        <linearGradient id="savingArea" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#41bf63" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#41bf63" stopOpacity="0.03" />
                        </linearGradient>
                      </defs>
                      <rect fill="#0B0C10" height="100" width="100" />
                      <rect fill="url(#optimizationGrid)" height="100" opacity="0.9" width="100" />
                      <path d="M0 70 C13 68 18 58 28 60 S46 48 56 50 S73 34 84 38 S95 28 100 24 L100 100 L0 100 Z" fill="url(#savingArea)" />
                      <path d="M0 70 C13 68 18 58 28 60 S46 48 56 50 S73 34 84 38 S95 28 100 24" fill="none" stroke="#41bf63" strokeLinecap="round" strokeWidth="2" />
                      <path d="M0 42 C16 48 30 35 44 39 S64 30 80 33 S93 26 100 28" fill="none" stroke="#6ee7a0" strokeDasharray="4 3" strokeLinecap="round" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute bottom-3 left-4 flex gap-4 text-xs font-bold text-slate-300">
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#41bf63]" /> Savings</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#6ee7a0]" /> Capacity headroom</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="border-b border-white/5 p-4">
                  <h3 className="text-base font-bold text-white">Optimization Mix</h3>
                </div>
                <div className="space-y-3 p-4">
                  {[
                    ["Routing", "34%", "bg-[#41bf63]"],
                    ["Capacity", "27%", "bg-[#41bf63]"],
                    ["Fiber", "18%", "bg-orange-500"],
                    ["Compute", "13%", "bg-[#6ee7a0]"],
                    ["Security", "8%", "bg-red-500"]
                  ].map(([label, value, color]) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{label}</span>
                        <span className="text-slate-500">{value}</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-white/10"><span className={`block h-full rounded-full ${color}`} style={{ width: value }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="flex flex-col gap-3 border-b border-white/5 p-3 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-base font-bold text-white">Optimization Recommendations ({filteredRecommendations.length})</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="relative min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search recommendations..."
                      value={query}
                    />
                  </div>
                  <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63]" onChange={(event) => setDomainFilter(event.target.value)} value={domainFilter}>
                    {["All", "Routing", "Capacity", "Fiber", "Compute", "Security"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-xs">
                  <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                    <tr>{["Plan", "Domain", "Status", "Impact", "Savings", "Confidence", "Region", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRecommendations.map((item) => (
                      <tr className={`cursor-pointer hover:bg-white/[0.02] ${selectedRecommendation.id === item.id ? "bg-[#41bf63]/5" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}>
                        <td className="px-3 py-2">
                          <p className="font-bold text-white">{item.title}</p>
                          <p className="text-[11px] font-semibold text-slate-500">{item.id} / Window {item.window}</p>
                        </td>
                        <td className="px-3 py-2"><span className="rounded-md border border-white/5 bg-[#0B0C10] px-2 py-0.5 font-bold text-slate-400">{item.domain}</span></td>
                        <td className="px-3 py-2"><StatusBadge status={item.status} /></td>
                        <td className="px-3 py-2 font-bold text-white">{item.impact}</td>
                        <td className="px-3 py-2 font-bold text-[#41bf63]">{item.saving}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-20 rounded-full bg-white/10"><span className="block h-full rounded-full bg-[#41bf63]" style={{ width: `${item.confidence}%` }} /></span>
                            <span className="font-bold text-white">{item.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 font-semibold text-white">{item.region}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2 text-slate-500">
                            <Play className="h-4 w-4 text-[#41bf63]" />
                            <Settings className="h-4 w-4" />
                            <MoreHorizontal className="h-4 w-4" />
                          </div>
                        </td>
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
                <h3 className="text-base font-bold text-white">Plan Details</h3>
                <StatusBadge status={selectedRecommendation.status} />
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p className="text-lg font-bold text-white">{selectedRecommendation.title}</p>
                  <p className="text-xs font-semibold text-slate-500">{selectedRecommendation.id} / {selectedRecommendation.domain} / {selectedRecommendation.region}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-white/5 bg-[#0B0C10] p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Savings</p>
                    <p className="text-xl font-bold text-[#41bf63]">{selectedRecommendation.saving}</p>
                  </div>
                  <div className="rounded-md border border-white/5 bg-[#0B0C10] p-3">
                    <p className="text-[10px] font-bold uppercase text-slate-500">Confidence</p>
                    <p className="text-xl font-bold text-white">{selectedRecommendation.confidence}%</p>
                  </div>
                </div>
                <div className="rounded-md border border-white/5 bg-[#0B0C10] p-3 text-xs font-bold">
                  <p>Impact: <span className="text-white">{selectedRecommendation.impact}</span></p>
                  <p className="mt-2">Apply Window: <span className="text-white">{selectedRecommendation.window}</span></p>
                  <p className="mt-2">Rollback Plan: <span className="text-white">Auto snapshot and route restore</span></p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-9 rounded-md bg-[#41bf63] text-xs font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" type="button">Apply Plan</button>
                  <button className="h-9 rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" type="button">Simulate</button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
              <div className="border-b border-white/5 p-4">
                <h3 className="text-base font-bold text-white">Live Optimization Queue</h3>
              </div>
              <div className="space-y-3 p-4">
                {[
                  ["Capacity planner recalculated link headroom", "2 min ago", "Applied"],
                  ["Routing optimizer found lower latency path", "8 min ago", "Ready"],
                  ["Fiber optimizer requires approval", "16 min ago", "Review"],
                  ["Compute scheduler shifted telemetry load", "24 min ago", "Applied"]
                ].map(([title, time, status]) => (
                  <div className="flex items-start justify-between gap-3 rounded-md border border-white/5 bg-[#0B0C10] p-3" key={title}>
                    <div>
                      <p className="text-xs font-bold text-white">{title}</p>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500">{time}</p>
                    </div>
                    <StatusBadge status={status} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
        </main>
      </div>
    </div>
  );
}
