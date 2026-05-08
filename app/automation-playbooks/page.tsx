"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Copy,
  Edit3,
  Filter,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Timer,
  Trash2,
  Upload,
  Workflow,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Active Playbooks", value: "67", delta: "+5.8%", icon: Workflow },
  { label: "Executions Today", value: "124", delta: "+11.6%", icon: Play },
  { label: "Success Rate", value: "92.5%", delta: "+3.2%", icon: ShieldCheck },
  { label: "Incidents Resolved", value: "31", delta: "-18%", icon: CheckCircle2 },
  { label: "Avg Automation Time", value: "2.3 min", delta: "-20%", icon: Timer }
];

function AutomationKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
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

const initialPlaybooks = [
  { name: "High CPU Restart Service", type: "Auto Remediation", status: "Active", success: 98.2, lastRun: "5 min ago", trigger: "CPU usage > 85% for 5 min" },
  { name: "Link Down Reroute Traffic", type: "Network", status: "Active", success: 94.1, lastRun: "12 min ago", trigger: "Link status = Down" },
  { name: "Fiber Risk Remediation", type: "Fiber", status: "Active", success: 91.7, lastRun: "28 min ago", trigger: "Attenuation rising 15%" },
  { name: "Fraud Alert Investigation", type: "Security", status: "Active", success: 89.4, lastRun: "1h ago", trigger: "Risk score > 80%" },
  { name: "Disk Cleanup & Archive", type: "Maintenance", status: "Paused", success: 76.3, lastRun: "3h ago", trigger: "Disk usage > 90%" }
];

const initialRecentExecutions = [
  { name: "High CPU Restart Service", time: "2 min ago", status: "Success", duration: "45s" },
  { name: "Link Down Reroute Traffic", time: "5 min ago", status: "Success", duration: "1m 12s" },
  { name: "Fiber Risk Remediation", time: "12 min ago", status: "Partial", duration: "3m 24s" },
  { name: "Disk Space Cleanup", time: "18 min ago", status: "Success", duration: "28s" },
  { name: "Fraud - SIM Box Detected", time: "1 hour ago", status: "Failed", duration: "Timeout" }
];

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
  const tone = status === "Active" || status === "Success" || status === "Enabled" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Running" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Queued" ? "border-white/10 bg-white/5 text-slate-300" : status === "Paused" || status === "Partial" ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-300" : "border-red-500/25 bg-red-500/10 text-red-400";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

export default function AutomationPlaybooksPage() {
  const [activeTab, setActiveTab] = useState("Playbooks");
  const [playbooks, setPlaybooks] = useState(initialPlaybooks);
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState(initialPlaybooks[0].name);
  const [statusFilter, setStatusFilter] = useState("All");
  const [tick, setTick] = useState(0);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const [recentExecutions, setRecentExecutions] = useState(initialRecentExecutions);
  const [workflowZoom, setWorkflowZoom] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter((playbook) => {
      const matchesQuery = `${playbook.name} ${playbook.type}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || playbook.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [playbooks, query, statusFilter]);

  const selectedPlaybook = playbooks.find((playbook) => playbook.name === selectedName) ?? playbooks[0];
  const zoomInWorkflow = () => setWorkflowZoom((value) => Math.min(1.4, Number((value + 0.1).toFixed(1))));
  const zoomOutWorkflow = () => setWorkflowZoom((value) => Math.max(0.8, Number((value - 0.1).toFixed(1))));

  const runSelected = () => {
    setPlaybooks((current) => current.map((playbook) => (
      playbook.name === selectedPlaybook.name
        ? { ...playbook, lastRun: "just now", status: "Active", success: Math.min(99.4, playbook.success + 0.2) }
        : playbook
    )));
    setRecentExecutions((current) => [
      {
        name: selectedPlaybook.name,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: selectedPlaybook.status === "Paused" ? "Partial" : "Success",
        duration: selectedPlaybook.status === "Paused" ? "Queued" : `${35 + (tick % 24)}s`
      },
      ...current
    ].slice(0, 7));
  };

  const toggleSelected = () => {
    setPlaybooks((current) => current.map((playbook) => (
      playbook.name === selectedPlaybook.name
        ? { ...playbook, status: playbook.status === "Active" ? "Paused" : "Active" }
        : playbook
    )));
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">

        <section className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1fr)_150px]">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {metrics.map((metric) => (
              <AutomationKpiCard key={metric.label} metric={metric} />
            ))}
          </div>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#41bf63] px-3 text-xs font-bold text-[#0B0C10] shadow-xl hover:bg-[#6ee7a0]" type="button">
            <Plus className="h-3.5 w-3.5" /> Create Playbook
          </button>
        </section>

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Automation Command Center</h2>
              <p className="text-sm font-semibold text-slate-300">Orchestrate smart workflows and automated response actions.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <MiniButton><Upload className="h-3.5 w-3.5" /> Import / Export</MiniButton>
              <MiniButton><Settings className="h-3.5 w-3.5" /> Settings</MiniButton>
              <span className="rounded-md border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1 text-xs font-bold text-[#41bf63]">Live {tick % 60}s</span>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
          <div className="flex flex-wrap gap-2 border-b border-white/5 p-3">
            {["Playbooks", "Executions", "Schedules", "Approvals", "Templates", "Audit Logs"].map((tab) => (
              <button
                className={`h-9 rounded-md px-4 text-sm font-bold ${activeTab === tab ? "bg-[#41bf63] text-[#0B0C10]" : "border border-white/10 bg-white/5 text-slate-300 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10 hover:text-white"}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[#13161F]">
                <div className="flex flex-col gap-3 border-b border-white/5 p-3 lg:flex-row lg:items-center lg:justify-between">
                  <h3 className="text-base font-bold text-white">All Playbooks ({filteredPlaybooks.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative min-w-[220px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search playbooks..."
                        value={query}
                      />
                    </div>
                    <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63]" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                      {["All", "Active", "Paused"].map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <MiniButton><Filter className="h-3.5 w-3.5" /> Sort</MiniButton>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-xs">
                    <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-300">
                      <tr>{["Playbook Name", "Type", "Status", "Success Rate", "Last Run", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPlaybooks.map((playbook) => (
                        <tr className={`cursor-pointer hover:bg-white/[0.02] ${selectedPlaybook.name === playbook.name ? "bg-[#41bf63]/5" : ""}`} key={playbook.name} onClick={() => setSelectedName(playbook.name)}>
                          <td className="px-3 py-2 font-bold text-white">{playbook.name}</td>
                          <td className="px-3 py-2"><span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-bold text-slate-300">{playbook.type}</span></td>
                          <td className="px-3 py-2"><StatusBadge status={playbook.status} /></td>
                          <td className="px-3 py-2 font-bold text-[#41bf63]">{playbook.success.toFixed(1)}%</td>
                          <td className="px-3 py-2 font-semibold text-white">{playbook.lastRun}</td>
                          <td className="px-3 py-2">
                            <div className="flex gap-2">
                              <Play className="h-4 w-4 text-[#41bf63]" />
                              <Edit3 className="h-4 w-4 text-slate-500" />
                              <Copy className="h-4 w-4 text-slate-500" />
                              <MoreHorizontal className="h-4 w-4 text-slate-500" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="flex flex-col gap-2 border-b border-white/5 bg-[#13161F] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white">Playbook Workflow Designer</h3>
                    <p className="mt-0.5 max-w-xl truncate text-[11px] font-semibold text-slate-500">Structured trigger, action, condition, and notification flow.</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <div className="flex overflow-hidden rounded-md border border-white/10 bg-white/5">
                      <button className="flex h-7 w-8 items-center justify-center text-slate-300 hover:bg-[#41bf63]/10" onClick={zoomOutWorkflow} title="Zoom out" type="button">
                        <ZoomOut className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex h-7 min-w-11 items-center justify-center border-x border-white/10 px-2 text-[11px] font-bold text-slate-300">{Math.round(workflowZoom * 100)}%</span>
                      <button className="flex h-7 w-8 items-center justify-center text-slate-300 hover:bg-[#41bf63]/10" onClick={zoomInWorkflow} title="Zoom in" type="button">
                        <ZoomIn className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button className="h-7 rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" onClick={runSelected} type="button">
                      Test Run
                    </button>
                    <button className="h-7 rounded-md bg-[#41bf63] px-3 text-[11px] font-bold text-[#0B0C10] hover:bg-[#6ee7a0]" type="button">
                      Save Playbook
                    </button>
                  </div>
                </div>
                <div className="overflow-auto bg-[#0B0C10] p-3">
                  <div
                    className="relative overflow-hidden rounded-md border border-white/5 bg-[#13161F]"
                    style={{ height: `${360 * workflowZoom}px`, width: `${900 * workflowZoom}px` }}
                  >
                    <div
                      className="relative h-[360px] w-[900px]"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.28) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        transform: `scale(${workflowZoom})`,
                        transformOrigin: "top left"
                      }}
                    >
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 360">
                        <defs>
                          <marker id="workflowArrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                            <path d="M0 0 L8 4 L0 8 Z" fill="#41bf63" />
                          </marker>
                        </defs>
                        <path d="M190 113 H215" fill="none" markerEnd="url(#workflowArrow)" stroke="#41bf63" strokeWidth="2" />
                        <path d="M385 113 H415" fill="none" markerEnd="url(#workflowArrow)" stroke="#41bf63" strokeWidth="2" />
                        <path d="M585 113 H615" fill="none" markerEnd="url(#workflowArrow)" stroke="#41bf63" strokeWidth="2" />
                        <path d="M700 156 V186 H480 V215" fill="none" markerEnd="url(#workflowArrow)" stroke="#41bf63" strokeWidth="2" />
                        <path d="M529 264 H615" fill="none" markerEnd="url(#workflowArrow)" stroke="#41bf63" strokeWidth="2" />
                        <path d="M431 264 H350 V188 H500 V156" fill="none" markerEnd="url(#workflowArrow)" stroke="#EF4444" strokeDasharray="5 4" strokeWidth="2" />
                      </svg>

                      <div className="absolute left-[40px] top-[70px] w-[150px] rounded-lg border border-[#41bf63]/25 bg-[#13161F] shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#41bf63] text-[10px] text-[#0B0C10]">1</span>Trigger</p>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <div className="space-y-1 px-3 py-3 text-xs font-semibold text-white">
                          <p>CPU &gt; 85%</p>
                          <p className="text-[11px] text-slate-500">For 3 minutes</p>
                        </div>
                      </div>

                      <div className="absolute left-[215px] top-[70px] w-[170px] rounded-lg border border-white/10 bg-white/5 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] text-[#0B0C10]">2</span>Check Service</p>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <div className="space-y-1 px-3 py-3 text-xs font-semibold text-white">
                          <p>Validate Process</p>
                          <p className="text-[11px] text-slate-500">If Service Not Responding</p>
                        </div>
                      </div>

                      <div className="absolute left-[415px] top-[70px] w-[170px] rounded-lg border border-white/10 bg-white/5 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#41bf63] text-[10px] text-[#0B0C10]">3</span>Restart Service</p>
                        </div>
                        <div className="space-y-1 px-3 py-3 text-xs font-semibold text-white">
                          <p>Restart Process</p>
                          <p className="text-[11px] text-slate-500">Wait 30 seconds</p>
                        </div>
                      </div>

                      <div className="absolute left-[615px] top-[70px] w-[170px] rounded-lg border border-[#41bf63]/25 bg-[#13161F] shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#41bf63] text-[10px] text-[#0B0C10]">4</span>Verify Health</p>
                        </div>
                        <div className="space-y-1 px-3 py-3 text-xs font-semibold text-white">
                          <p>Check CPU &lt; 70%</p>
                          <p className="text-[11px] text-slate-500">Timeout: 2 min</p>
                        </div>
                      </div>

                      <div className="absolute left-[431px] top-[215px] h-[98px] w-[98px] rotate-45 border border-[#41bf63]/25 bg-[#13161F] shadow-xl">
                        <div className="flex h-full w-full -rotate-45 flex-col items-center justify-center text-center">
                          <p className="text-[11px] font-bold text-white">Condition</p>
                          <p className="text-[10px] font-semibold text-slate-500">CPU &lt; 70% ?</p>
                        </div>
                      </div>
                      <span className="absolute left-[356px] top-[244px] rounded bg-red-500/10 px-1.5 py-0.5 text-xs font-bold text-red-400">N</span>
                      <span className="absolute left-[565px] top-[246px] rounded bg-[#41bf63]/10 px-1.5 py-0.5 text-xs font-bold text-[#41bf63]">Yes</span>

                      <div className="absolute left-[615px] top-[240px] w-[170px] rounded-lg border border-white/10 bg-white/5 shadow-xl">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                          <p className="flex items-center gap-2 text-xs font-bold text-white"><span className="h-4 w-4 rounded-full bg-yellow-400" />Send Notification</p>
                          <MoreHorizontal className="h-3.5 w-3.5 text-slate-500" />
                        </div>
                        <div className="space-y-1 px-3 py-3 text-xs font-semibold text-white">
                          <p>Alert to NOC Team</p>
                          <p className="text-[11px] text-slate-500">Log to System</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 p-4">
                  <h3 className="text-base font-bold text-white">Playbook Details</h3>
                  <StatusBadge status={selectedPlaybook.status} />
                </div>
                <div className="p-4">
                  <p className="text-lg font-bold text-white">{selectedPlaybook.name}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Automatically detects {selectedPlaybook.trigger.toLowerCase()} and executes remediation.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-white/5 bg-white/5 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Success</p>
                      <p className="text-xl font-bold text-[#41bf63]">{selectedPlaybook.success.toFixed(1)}%</p>
                    </div>
                    <div className="rounded-md border border-white/5 bg-white/5 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Runs</p>
                      <p className="text-xl font-bold text-white">{245 + (tick % 4)}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-md border border-white/5 bg-white/5 p-3 text-xs font-bold">
                    <p>Trigger: <span className="text-white">{selectedPlaybook.trigger}</span></p>
                    <p className="mt-2">Data Source: <span className="text-white">RCA Agent, SNMP</span></p>
                    <p className="mt-2">Last Modified: <span className="text-white">Today 09:15 AM</span></p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button className="h-9 rounded-md bg-[#41bf63] text-xs font-bold text-[#0B0C10]" onClick={runSelected} type="button">Run Now</button>
                    <button className="h-9 rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" onClick={toggleSelected} type="button">
                      {selectedPlaybook.status === "Active" ? "Pause" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="border-b border-white/5 bg-[#13161F] p-4">
                  <h3 className="text-base font-bold text-white">Recent Executions</h3>
                </div>
                <div className="space-y-4 p-4">
                  {recentExecutions.map((execution) => {
                    const statusTone = execution.status === "Success" ? "text-[#41bf63]" : execution.status === "Partial" ? "text-yellow-300" : "text-red-400";
                    const statusDot = execution.status === "Success" ? "bg-[#41bf63]" : execution.status === "Partial" ? "bg-yellow-500" : "bg-red-500";
                    return (
                      <div className="flex items-start gap-3 rounded-md border border-white/5 bg-white/5 p-3" key={`${execution.name}-${execution.time}-${execution.duration}`}>
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${statusDot} text-[9px] font-bold text-white`}>
                          {execution.status === "Failed" ? "x" : "ok"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-white">{execution.name}</p>
                          <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{execution.time}</p>
                          <p className={`mt-1 text-[11px] font-bold ${statusTone}`}>
                            {execution.status} <span className="text-slate-400">/</span> {execution.duration}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h3 className="text-base font-bold text-white">Execution History</h3>
              <MiniButton>Last 7 Days <ChevronDown className="h-3.5 w-3.5" /></MiniButton>
            </div>
            <div className="h-64 p-4">
              <div className="flex h-full items-end gap-4 rounded-lg border border-white/5 bg-white/5 p-4">
                {[25, 42, 58, 70, 80, 88].map((height, index) => (
                  <div className="flex flex-1 flex-col items-center gap-2" key={height}>
                    <span className="w-full rounded-t bg-[#41bf63] transition-all" style={{ height: `${height + (tick % 3) * 2}%` }} />
                    <span className="text-[10px] font-bold text-slate-500">{19 + index}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="border-b border-white/5 p-4">
              <h3 className="text-base font-bold text-white">Automation Activity</h3>
            </div>
            <div className="space-y-3 p-4">
              {[
                ["High CPU Restart Service executed successfully", "5 min ago", "Success"],
                ["Link Down Reroute Traffic triggered by alert #1023", "12 min ago", "Running"],
                ["Fiber Risk Remediation failed threshold check", "1h ago", "Failed"],
                ["Fraud Investigation workflow auto-assigned", "2h ago", "Success"]
              ].map(([title, time, status]) => (
                <div className="flex items-center justify-between gap-3 rounded-md border border-white/5 bg-white/5 p-3" key={title}>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs font-semibold text-slate-500">{time}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h3 className="text-base font-bold text-white">Scheduled Executions</h3>
              <MiniButton><Plus className="h-3.5 w-3.5" /> Add Schedule</MiniButton>
            </div>
            <div className="divide-y divide-white/5">
              {["Disk Cleanup / Daily 02:00 AM", "Traffic Optimization / Every 6 Hours"].map((item) => (
                <div className="flex items-center justify-between p-4" key={item}>
                  <div>
                    <p className="text-sm font-bold text-white">{item.split(" / ")[0]}</p>
                    <p className="text-xs font-semibold text-slate-500">{item.split(" / ")[1]}</p>
                  </div>
                  <button
                    className={`h-6 w-11 rounded-full p-1 transition ${scheduleEnabled ? "bg-[#41bf63]" : "bg-white/20"}`}
                    onClick={() => setScheduleEnabled((value) => !value)}
                    type="button"
                  >
                    <span className={`block h-4 w-4 rounded-full bg-white transition ${scheduleEnabled ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <h3 className="text-base font-bold text-white">Approval Rules</h3>
              <MiniButton><Plus className="h-3.5 w-3.5" /> Add Rule</MiniButton>
            </div>
            <div className="divide-y divide-white/5">
              {[
                ["Critical Incident Automation", "Severity = Critical", "Network Manager"],
                ["Config Change Automation", "Change Type = Config", "Change Board"]
              ].map(([rule, condition, approver]) => (
                <div className="grid grid-cols-[minmax(0,1fr)_120px_80px] items-center gap-3 p-4" key={rule}>
                  <div>
                    <p className="text-sm font-bold text-white">{rule}</p>
                    <p className="text-xs font-semibold text-slate-500">{condition} / {approver}</p>
                  </div>
                  <StatusBadge status="Active" />
                  <div className="flex gap-2">
                    <Edit3 className="h-4 w-4 text-slate-500" />
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
