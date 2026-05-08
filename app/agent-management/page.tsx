"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  Bell,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Cpu,
  Filter,
  GitBranch,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  TriangleAlert,
  Server,
  Monitor,
  Info,
  Copy,
  Apple
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

const metrics = [
  { label: "Total Agents", value: "160", delta: "+4 online", icon: Bot },
  { label: "Active Agents", value: "156", delta: "97.5%", icon: CheckCircle2 },
  { label: "Avg Response", value: "240 ms", delta: "-12 ms", icon: Timer },
  { label: "Policy Blocks", value: "8", delta: "today", icon: ShieldCheck },
  { label: "Needs Review", value: "4", delta: "2 critical", icon: TriangleAlert }
];

const agents = [
  { id: "AG-101", name: "RCA Analysis Agent", type: "Root Cause", status: "Active", health: 98, region: "US-West", tasks: 42, latency: "210 ms", owner: "NOC Core" },
  { id: "AG-118", name: "Fiber Drift Agent", type: "Fiber", status: "Active", health: 94, region: "US-East", tasks: 31, latency: "260 ms", owner: "Fiber Ops" },
  { id: "AG-126", name: "Fraud Pattern Agent", type: "Security", status: "Active", health: 91, region: "Central", tasks: 27, latency: "290 ms", owner: "Fraud Desk" },
  { id: "AG-144", name: "Topology Mapper", type: "Network", status: "Training", health: 82, region: "Global", tasks: 18, latency: "340 ms", owner: "Planning" },
  { id: "AG-152", name: "Playbook Executor", type: "Automation", status: "Paused", health: 73, region: "US-West", tasks: 12, latency: "410 ms", owner: "Automation" }
];

const activityLog = [
  ["RCA Analysis Agent completed incident correlation", "2 min ago", "Success"],
  ["Fiber Drift Agent detected attenuation trend", "9 min ago", "Warning"],
  ["Playbook Executor waiting for approval rule", "15 min ago", "Paused"],
  ["Fraud Pattern Agent refreshed model signals", "22 min ago", "Success"]
];

function AgentKpiCard({ metric }: { metric: (typeof metrics)[number] }) {
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
  const tone = status === "Active" || status === "Success" ? "border-[#41bf63]/25 bg-[#41bf63]/10 text-[#41bf63]" : status === "Training" || status === "Warning" ? "border-yellow-500/25 bg-yellow-500/10 text-yellow-300" : status === "Paused" ? "border-white/10 bg-white/5 text-slate-300" : "border-red-500/25 bg-red-500/10 text-red-400";

  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${tone}`}>{status}</span>;
}

function StepIndicator({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#41bf63] text-xs font-bold text-[#0B0C10]">
        {num}
      </div>
      <h3 className="text-base font-bold text-white">{title}</h3>
    </div>
  );
}

function DeployAgentView({ onBack }: { onBack: () => void }) {
  const [os, setOs] = useState('WINDOWS');
  const [arch, setArch] = useState('MSI 32/64 bits');
  const [serverAddress, setServerAddress] = useState('recon.teleroot.net');
  const [agentName, setAgentName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="inline-flex h-8 items-center gap-1.5 rounded-md text-sm font-bold text-slate-400 hover:text-white transition">
          <ChevronLeft className="h-4 w-4" /> Deploy new agent
        </button>
      </div>

      <div className="rounded-lg border border-white/5 bg-[#13161F] p-6 shadow-xl space-y-8">
        {/* Step 1 */}
        <div>
          <StepIndicator num={1} title="Select the package to download and install on your system:" />
          <div className="ml-9 grid gap-4 md:grid-cols-3">
            <div className={`cursor-pointer rounded-lg border p-4 transition ${os === 'LINUX' ? 'border-[#41bf63] ring-1 ring-[#41bf63] bg-[#41bf63]/5' : 'border-white/10 hover:border-[#41bf63]/30'}`} onClick={() => setOs('LINUX')}>
              <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-3 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white p-1 shadow-sm"><Image src="/linux-logo.png" alt="Linux" width={20} height={20} className="object-contain" /></span>
                <span className="font-bold text-white">LINUX</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['RPM amd64', 'RPM aarch64', 'DEB amd64', 'DEB aarch64'].map(a => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="arch_linux" checked={os === 'LINUX' && arch === a} onChange={() => { setOs('LINUX'); setArch(a); }} className="accent-[#41bf63]" />
                    <span className="font-semibold text-slate-300">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={`cursor-pointer rounded-lg border p-4 transition ${os === 'WINDOWS' ? 'border-[#41bf63] ring-1 ring-[#41bf63] bg-[#41bf63]/5' : 'border-white/10 hover:border-[#41bf63]/30'}`} onClick={() => { setOs('WINDOWS'); setArch('MSI 32/64 bits'); }}>
              <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-3 mb-3">
                <Image src="/windows.png" alt="Windows" width={20} height={20} className="object-contain" />
                <span className="font-bold text-white">WINDOWS</span>
              </div>
              <div className="flex justify-center text-xs">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="arch_win" checked={os === 'WINDOWS' && arch === 'MSI 32/64 bits'} onChange={() => { setOs('WINDOWS'); setArch('MSI 32/64 bits'); }} className="accent-[#41bf63]" />
                    <span className="font-semibold text-slate-300">MSI 32/64 bits</span>
                  </label>
              </div>
            </div>

            <div className={`cursor-pointer rounded-lg border p-4 transition ${os === 'MACOS' ? 'border-[#41bf63] ring-1 ring-[#41bf63] bg-[#41bf63]/5' : 'border-white/10 hover:border-[#41bf63]/30'}`} onClick={() => { setOs('MACOS'); setArch('Intel'); }}>
              <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-3 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white p-1 shadow-sm"><Image src="/apple-logo.png" alt="macOS" width={20} height={20} className="object-contain" /></span>
                <span className="font-bold text-white">macOS</span>
              </div>
              <div className="grid gap-2 text-xs">
                {['Intel', 'Apple silicon'].map(a => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="arch_mac" checked={os === 'MACOS' && arch === a} onChange={() => { setOs('MACOS'); setArch(a); }} className="accent-[#41bf63]" />
                    <span className="font-semibold text-slate-300">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="ml-9 mt-4 flex items-center gap-2 rounded-md border border-[#41bf63]/20 bg-[#41bf63]/10 p-3 text-sm font-semibold text-[#41bf63]">
            <Info className="h-4 w-4" />
            For additional systems and architectures, please check our documentation.
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <StepIndicator num={2} title="Server address:" />
          <div className="ml-9 space-y-2">
            <p className="text-sm font-semibold text-slate-500">This is the address the agent uses to communicate with the server. Enter an IP address or a fully qualified domain name (FQDN).</p>
            <label className="block text-xs font-bold text-white">Assign a server address <Info className="inline h-3 w-3 text-slate-400"/></label>
            <input 
              type="text" 
              value={serverAddress} 
              onChange={(e) => setServerAddress(e.target.value)}
              className="h-9 w-full max-w-md rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
              placeholder="e.g. recon.teleroot.net"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <StepIndicator num={3} title="Optional settings:" />
          <div className="ml-9 space-y-4">
            <p className="text-sm font-semibold text-slate-500">By default, the deployment uses the hostname as the agent name. Optionally, you can use a different agent name in the field below.</p>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white">Assign an agent name <Info className="inline h-3 w-3 text-slate-400"/></label>
              <input 
                type="text" 
                value={agentName} 
                onChange={(e) => setAgentName(e.target.value)}
                className="h-9 w-full max-w-md rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                placeholder="Agent name"
              />
              <div className="flex max-w-2xl items-center gap-2 rounded-md border border-orange-500/20 bg-orange-500/10 p-3 text-xs font-semibold text-orange-400">
                <Info className="h-4 w-4 shrink-0" />
                The agent name must be unique. It can't be changed once the agent has been enrolled.
              </div>
            </div>

            <div className="space-y-2">
               <label className="block text-xs font-bold text-white">Select one or more existing groups <Info className="inline h-3 w-3 text-slate-400"/></label>
               <select className="h-9 w-full max-w-md rounded-md border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]">
                 <option>Default</option>
                 <option>Linux Servers</option>
                 <option>Windows Workstations</option>
               </select>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div>
          <StepIndicator num={4} title="Run the following commands to download and install the agent:" />
          <div className="ml-9 space-y-4">
            <div className="relative rounded-md bg-[#0B0C10] p-4 border border-white/5">
              <code className="text-xs font-mono text-slate-300 break-all leading-relaxed">
                {os === 'WINDOWS' ? `Invoke-WebRequest -Uri https://packages.teleroot.net/agent/windows/teleroot-agent-latest.msi -OutFile $env:tmp\\teleroot-agent.msi; msiexec.exe /i $env:tmp\\teleroot-agent.msi /q TELERROOT_MANAGER='${serverAddress}' TELERROOT_REGISTRATION_PASSWORD='${showPassword ? 'secret_password_123' : '*******************'}'` : `curl -so teleroot-agent.deb https://packages.teleroot.net/agent/linux/teleroot-agent-latest.deb && sudo TELERROOT_MANAGER='${serverAddress}' TELERROOT_REGISTRATION_PASSWORD='${showPassword ? 'secret_password_123' : '*******************'}' dpkg -i teleroot-agent.deb`}
              </code>
            </div>
            <label className="flex items-center gap-2 cursor-pointer w-max">
              <div className={`flex h-4 w-8 items-center rounded-full p-0.5 transition-colors ${showPassword ? 'bg-[#41bf63]' : 'bg-white/20'}`}>
                <div className={`h-3 w-3 rounded-full bg-white transition-transform ${showPassword ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="sr-only" />
              <span className="text-sm font-semibold text-slate-300">Show password</span>
            </label>

            <div className="rounded-md bg-[#41bf63]/10 p-4 border border-[#41bf63]/20 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#41bf63]">
                <Info className="h-4 w-4" /> Requirements
              </div>
              <ul className="list-disc pl-5 text-sm font-semibold text-[#41bf63] space-y-1">
                <li>You will need administrator privileges to perform this installation.</li>
                {os === 'WINDOWS' && <li>PowerShell 3.0 or greater is required.</li>}
              </ul>
              {os === 'WINDOWS' && <p className="text-sm font-semibold text-[#41bf63] pt-2">Keep in mind you need to run this command in a Windows PowerShell terminal.</p>}
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div>
          <StepIndicator num={5} title="Start the agent:" />
          <div className="ml-9">
            <div className="relative flex items-center justify-between gap-4 rounded-md bg-white/5 border border-white/5 p-3 max-w-lg">
              <code className="text-xs font-mono font-bold text-slate-300">
                {os === 'WINDOWS' ? 'NET START Teleroot' : 'sudo systemctl start teleroot-agent'}
              </code>
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white shrink-0">
                <Copy className="h-3.5 w-3.5" /> Copy command
              </button>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div>
          <StepIndicator num={6} title="Go to endpoints to verify the agent connection:" />
          <div className="ml-9">
            <button onClick={onBack} className="inline-flex h-10 items-center justify-center rounded-md bg-[#41bf63] px-6 text-sm font-bold text-[#0B0C10] shadow-xl hover:bg-[#6ee7a0] transition">
              Back to agent list
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AgentManagementPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);
  const [tick, setTick] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesQuery = `${agent.id} ${agent.name} ${agent.type} ${agent.owner}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || agent.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId) ?? agents[0];

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72">
        <Navbar />
        <main className="px-4 py-8 sm:px-6 lg:px-10 bg-[#0B0C10] text-white">
          {isDeploying ? (
            <DeployAgentView onBack={() => setIsDeploying(false)} />
          ) : (
            <>
              <section className="mt-3 grid gap-2 xl:grid-cols-[minmax(0,1fr)_150px]">
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {metrics.map((metric) => (
                <AgentKpiCard key={metric.label} metric={metric} />
              ))}
            </div>
            <button 
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#41bf63] px-3 text-xs font-bold text-[#0B0C10] shadow-xl hover:bg-[#6ee7a0]" 
              type="button"
              onClick={() => setIsDeploying(true)}
            >
              <Plus className="h-3.5 w-3.5" /> Add Recon Agent
            </button>
          </section>

          <section className="mt-4 rounded-lg border border-white/5 bg-[#13161F] p-4 shadow-xl">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Agent Control Center</h2>
                <p className="text-sm font-semibold text-slate-300">Monitor AI agents, runtime health, policy status, and operational workload.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <MiniButton><RefreshCw className="h-3.5 w-3.5" /> Sync Registry</MiniButton>
                <MiniButton><SlidersHorizontal className="h-3.5 w-3.5" /> Policies</MiniButton>
                <span className="rounded-md border border-[#41bf63]/25 bg-[#41bf63]/10 px-3 py-1 text-xs font-bold text-[#41bf63]">Live {tick % 60}s</span>
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="flex flex-col gap-3 border-b border-white/5 p-3 lg:flex-row lg:items-center lg:justify-between">
                  <h3 className="text-base font-bold text-white">Agent Registry ({filteredAgents.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative min-w-[220px]">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm font-semibold text-white outline-none placeholder:text-slate-500 focus:border-[#41bf63]"
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search agents..."
                        value={query}
                      />
                    </div>
                    <select className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-white outline-none focus:border-[#41bf63]" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                      {["All", "Active", "Training", "Paused"].map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <MiniButton><Filter className="h-3.5 w-3.5" /> Filter</MiniButton>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[860px] text-left text-xs">
                    <thead className="border-b border-white/5 text-[11px] uppercase tracking-wide text-slate-400">
                      <tr>{["Agent", "Type", "Status", "Health", "Region", "Tasks", "Latency", "Actions"].map((head) => <th className="px-3 py-2 font-bold" key={head}>{head}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredAgents.map((agent) => (
                        <tr className={`cursor-pointer hover:bg-white/[0.02] ${selectedAgent.id === agent.id ? "bg-[#41bf63]/5" : ""}`} key={agent.id} onClick={() => setSelectedAgentId(agent.id)}>
                          <td className="px-3 py-2">
                            <p className="font-bold text-white">{agent.name}</p>
                            <p className="text-[11px] font-semibold text-slate-500">{agent.id} / {agent.owner}</p>
                          </td>
                          <td className="px-3 py-2"><span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-bold text-slate-300">{agent.type}</span></td>
                          <td className="px-3 py-2"><StatusBadge status={agent.status} /></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-20 rounded-full bg-white/10"><span className="block h-full rounded-full bg-[#41bf63]" style={{ width: `${agent.health}%` }} /></span>
                              <span className="font-bold text-white">{agent.health}%</span>
                            </div>
                          </td>
                          <td className="px-3 py-2 font-semibold text-white">{agent.region}</td>
                          <td className="px-3 py-2 font-bold text-white">{agent.tasks}</td>
                          <td className="px-3 py-2 font-semibold text-slate-300">{agent.latency}</td>
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

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                  <div className="border-b border-white/5 p-4">
                    <h3 className="text-base font-bold text-white">Runtime Pipeline</h3>
                  </div>
                  <div className="space-y-3 p-4">
                    {[
                      ["Input Queue", "Events normalized", "98%"],
                      ["Reasoning Core", "Policies applied", "91%"],
                      ["Action Router", "Tool calls gated", "86%"],
                      ["Audit Writer", "Evidence stored", "100%"]
                    ].map(([name, detail, value]) => (
                      <div className="rounded-md border border-white/5 bg-white/5 p-3" key={name}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-white">{name}</span>
                          <span className="text-slate-500">{value}</span>
                        </div>
                        <p className="mt-1 text-[11px] font-semibold text-slate-500">{detail}</p>
                        <div className="mt-2 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-[#41bf63]" style={{ width: value }} /></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                  <div className="border-b border-white/5 p-4">
                    <h3 className="text-base font-bold text-white">Capability Map</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-4">
                    {[
                      ["RCA", "38 agents", BrainIcon],
                      ["Fiber", "29 agents", Activity],
                      ["Security", "34 agents", ShieldCheck],
                      ["Automation", "55 agents", GitBranch]
                    ].map(([title, count, Icon]) => (
                      <div className="rounded-md border border-white/5 bg-white/5 p-3" key={title as string}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-white">{title as string}</p>
                          <Icon className="h-4 w-4 text-[#41bf63]" />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-slate-500">{count as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 p-4">
                  <h3 className="text-base font-bold text-white">Agent Details</h3>
                  <StatusBadge status={selectedAgent.status} />
                </div>
                <div className="space-y-4 p-4">
                  <div>
                    <p className="text-lg font-bold text-white">{selectedAgent.name}</p>
                    <p className="text-xs font-semibold text-slate-500">{selectedAgent.id} / {selectedAgent.type} / {selectedAgent.region}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-white/5 bg-white/5 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Health</p>
                      <p className="text-xl font-bold text-[#41bf63]">{selectedAgent.health}%</p>
                    </div>
                    <div className="rounded-md border border-white/5 bg-white/5 p-3">
                      <p className="text-[10px] font-bold uppercase text-slate-500">Tasks</p>
                      <p className="text-xl font-bold text-white">{selectedAgent.tasks + (tick % 3)}</p>
                    </div>
                  </div>
                  <div className="rounded-md border border-white/5 bg-white/5 p-3 text-xs font-bold">
                    <p>Owner: <span className="text-white">{selectedAgent.owner}</span></p>
                    <p className="mt-2">Latency: <span className="text-white">{selectedAgent.latency}</span></p>
                    <p className="mt-2">Last Heartbeat: <span className="text-white">{tick % 9}s ago</span></p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="h-9 rounded-md bg-[#41bf63] text-xs font-bold text-[#0B0C10]" type="button">Restart Agent</button>
                    <button className="h-9 rounded-md border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:border-[#41bf63]/30 hover:bg-[#41bf63]/10" type="button">Open Config</button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-[#13161F] shadow-xl">
                <div className="border-b border-white/5 p-4">
                  <h3 className="text-base font-bold text-white">Recent Agent Activity</h3>
                </div>
                <div className="space-y-3 p-4">
                  {activityLog.map(([title, time, status]) => (
                    <div className="flex items-start justify-between gap-3 rounded-md border border-white/5 bg-white/5 p-3" key={title}>
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
          </>
          )}
        </main>
      </div>
    </div>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return <Cpu className={className} />;
}
