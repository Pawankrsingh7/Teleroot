"use client";

import { useState } from "react";
import {
  Activity,
  ChevronDown,
  Filter,
  Send,
  Sparkles,
  TriangleAlert,
  PlusCircle,
  User,
  CheckCircle2,
  Clock,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

type Severity = "High" | "Medium" | "Low";

type AlertService = {
  name: string;
  issue: string;
  expanded?: boolean;
  solution?: {
    steps: string[];
    status: "Resolved" | "In Progress";
  };
};

type AlertGroup = {
  severity: Severity;
  count: number;
  services: AlertService[];
};

const alertsData: AlertGroup[] = [
  {
    severity: "High",
    count: 2,
    services: [
      {
        name: "Core Switch R1",
        issue: "Loss of Signal on Port 4",
        expanded: true,
        solution: {
          steps: [
            "Detected physical link failure on Port 4.",
            "Rerouted traffic via Backup Router R2.",
            "Triggered dispatch for transceiver replacement.",
            "Verifying latency stability across new paths."
          ],
          status: "Resolved"
        }
      },
      {
        name: "Firewall Cluster Alpha",
        issue: "Suspicious Traffic Spike",
        expanded: true,
        solution: {
          steps: [
            "Identified anomalous DDoS patterns.",
            "Enabled aggressive rate-limiting rules.",
            "Blocked originating malicious IPs."
          ],
          status: "In Progress"
        }
      }
    ]
  },
  {
    severity: "Medium",
    count: 3,
    services: [
      { name: "VPN Gateway", issue: "High Memory Usage" },
      { name: "Fiber Link A-6", issue: "Signal Attenuation" }
    ]
  },
  {
    severity: "Low",
    count: 2,
    services: [
      { name: "Auth Server", issue: "Failed Login Anomalies" },
      { name: "DMZ Host", issue: "SSL Certificate Expiring" }
    ]
  }
];

const suggestions = [
  "Show related alerts",
  "What's the current status?",
  "Recommend next steps",
  "Create incident"
];

export default function AiCopilotPage() {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white selection:bg-[#41bf63]/30">
      <Sidebar />
      <div className="app-shell lg:pl-72 flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex h-full gap-6 flex-col lg:flex-row">
            
            {/* Left Column: Alerts & Solutions */}
            <div className="w-full lg:w-1/3 flex flex-col border border-white/5 rounded-2xl bg-[#13161F] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 p-5">
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Alerts & Solutions</h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition">
                    <Filter className="h-3.5 w-3.5" /> Filter
                  </button>
                  <span className="rounded-lg bg-red-500/20 px-2 py-0.5 text-[10px] font-black text-red-500 uppercase">12</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {alertsData.map((group) => (
                  <div key={group.severity}>
                    <div className="flex items-center gap-2 mb-4">
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                      {group.severity === 'High' && <TriangleAlert className="h-4 w-4 text-red-500" />}
                      {group.severity === 'Medium' && <TriangleAlert className="h-4 w-4 text-orange-500" />}
                      {group.severity === 'Low' && <Activity className="h-4 w-4 text-blue-500" />}
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">{group.severity} - {group.count}</span>
                    </div>
                    <div className="ml-2 border-l border-white/5 pl-6 space-y-5">
                      {group.services.map((service, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[25px] top-2 h-px w-4 bg-white/5" />
                          <div className="flex items-center gap-2 mb-2">
                            {group.severity === 'High' && <TriangleAlert className="h-3.5 w-3.5 text-red-500" />}
                            {group.severity === 'Medium' && <TriangleAlert className="h-3.5 w-3.5 text-orange-500" />}
                            {group.severity === 'Low' && <Activity className="h-3.5 w-3.5 text-blue-500" />}
                            <span className="text-[12px] font-bold text-slate-300">Service: {service.name}</span>
                          </div>
                          
                          <div className="ml-1.5 border-l border-white/5 pl-5">
                            <div className="relative">
                              <div className="absolute -left-[21px] top-2.5 h-px w-4 bg-white/5" />
                              <div className="flex items-center justify-between cursor-pointer rounded-xl hover:bg-white/5 py-2 px-3 -ml-3 transition-colors">
                                <div className="flex items-center gap-2">
                                   {group.severity === 'High' && <div className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                                   {group.severity === 'Medium' && <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
                                   {group.severity === 'Low' && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                                   <span className="text-[11px] font-bold text-slate-400">Issue: {service.issue}</span>
                                </div>
                                {service.expanded ? <ChevronDown className="h-3.5 w-3.5 text-slate-600" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-600 -rotate-90" />}
                              </div>
                              
                              {service.expanded && service.solution && (
                                <div className="mt-3 rounded-xl border border-white/5 bg-[#1a1e29]/50 p-4 shadow-xl ml-1">
                                  <p className="text-[10px] font-black text-[#41bf63] uppercase tracking-widest mb-3">Proposed Solution</p>
                                  <ul className="space-y-2 mb-4">
                                    {service.solution.steps.map((step, i) => (
                                      <li key={i} className="flex gap-2 text-[11px] font-bold text-slate-400">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                  {service.solution.status === 'Resolved' ? (
                                     <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#41bf63]/10 px-2.5 py-1 text-[9px] font-black text-[#41bf63] uppercase tracking-widest border border-[#41bf63]/20">
                                       <CheckCircle2 className="h-3 w-3" /> Resolved
                                     </span>
                                  ) : (
                                     <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1 text-[9px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20">
                                       <Clock className="h-3 w-3" /> In Progress
                                     </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: AI Copilot Chat */}
            <div className="w-full lg:w-2/3 flex flex-col border border-white/5 rounded-2xl bg-[#13161F] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 p-5">
                <h2 className="text-sm font-black text-white uppercase tracking-wider">AI Copilot Chat</h2>
                <button className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-black text-white uppercase tracking-widest transition-all hover:bg-[#41bf63] hover:text-black hover:border-transparent">
                  <PlusCircle className="h-4 w-4" /> New Incident
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-8 bg-[#0a0b0d]/30">
                <div className="flex flex-col items-center justify-center text-center pb-12 pt-6">
                   <div className="h-14 w-14 rounded-2xl bg-[#41bf63]/10 flex items-center justify-center border border-[#41bf63]/20 mb-4">
                     <Sparkles className="h-8 w-8 text-[#41bf63]" />
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight">Intelligence <span className="text-[#41bf63]">Copilot</span></h3>
                   <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-widest max-w-sm">Operational analysis, incident diagnosis, and remediation support.</p>
                </div>

                <div className="space-y-8">
                  {/* User Message */}
                  <div className="flex justify-end gap-4">
                     <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-white/5 border border-white/5 p-5 text-[13px] font-bold text-white shadow-2xl">
                       <p className="leading-relaxed">Why is Core Switch R1 showing a loss of signal on Port 4?</p>
                       <p className="mt-3 text-right text-[9px] font-black text-slate-500 uppercase tracking-widest">10:24 AM <CheckCircle2 className="inline h-3 w-3 text-[#41bf63] ml-1"/></p>
                     </div>
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#41bf63] text-black shadow-[0_0_20px_rgba(65,191,99,0.3)]">
                       <User className="h-5 w-5" />
                     </div>
                  </div>

                  {/* Copilot Message */}
                  <div className="flex justify-start gap-4">
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#41bf63]">
                       <Sparkles className="h-5 w-5" />
                     </div>
                     <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/5 bg-[#1a1e29]/50 p-6 text-[13px] font-bold text-slate-300 shadow-2xl leading-relaxed">
                       <p>Core Switch R1 experienced a sudden physical link failure on Port 4, resulting in localized packet drops across the immediate segment.</p>
                       
                       <div className="mt-6 space-y-6">
                         <div>
                           <p className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em] mb-2">Root Cause Analysis</p>
                           <p className="text-white">Hardware transceiver failure detected on interface Ge0/4.</p>
                         </div>

                         <div>
                           <p className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em] mb-2">Network Impact</p>
                           <ul className="space-y-1.5">
                             <li className="flex gap-2 items-start"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#41bf63]" /> 1 switch, 2 fiber links, and 1 gateway momentarily disconnected.</li>
                             <li className="flex gap-2 items-start"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#41bf63]" /> Temporary 14% spike in localized latency during reroute.</li>
                           </ul>
                         </div>

                         <div>
                           <p className="text-[10px] font-black text-[#41bf63] uppercase tracking-[0.2em] mb-2">Remediation Status</p>
                           <ul className="space-y-2">
                             <li className="flex gap-3 items-center"><span className="text-[10px] font-black text-[#41bf63] bg-[#41bf63]/10 h-5 w-5 rounded flex items-center justify-center border border-[#41bf63]/20">01</span> Auto-reroute engaged via Backup Router R2.</li>
                             <li className="flex gap-3 items-center"><span className="text-[10px] font-black text-[#41bf63] bg-[#41bf63]/10 h-5 w-5 rounded flex items-center justify-center border border-[#41bf63]/20">02</span> Created hardware replacement ticket #1023.</li>
                             <li className="flex gap-3 items-center"><span className="text-[10px] font-black text-[#41bf63] bg-[#41bf63]/10 h-5 w-5 rounded flex items-center justify-center border border-[#41bf63]/20">03</span> Continuous latency monitoring active.</li>
                           </ul>
                         </div>
                       </div>

                       <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                         <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">10:24 AM</p>
                         <div className="flex gap-3">
                           <button className="text-slate-600 hover:text-white transition"><Copy className="h-4 w-4" /></button>
                           <button className="text-slate-600 hover:text-white transition"><ThumbsUp className="h-4 w-4" /></button>
                           <button className="text-slate-600 hover:text-white transition"><ThumbsDown className="h-4 w-4" /></button>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-[#13161F] p-5 border-t border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                   {suggestions.map(s => (
                     <button key={s} className="whitespace-nowrap rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-white/10 hover:text-white hover:border-white/20 shadow-xl">
                       {s}
                     </button>
                   ))}
                </div>
                <div className="relative flex items-center rounded-xl border border-white/10 bg-[#0a0b0d] shadow-2xl focus-within:border-[#41bf63]/50 transition-all">
                   <input 
                     className="h-14 w-full bg-transparent px-5 text-[13px] font-bold text-white outline-none placeholder:text-slate-600 tracking-wide" 
                     placeholder="Query network status or ask for diagnosis..." 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                   />
                   <button className="mr-3 h-10 w-10 rounded-lg flex items-center justify-center text-[#41bf63] hover:bg-[#41bf63]/10 transition-colors">
                     <Send className="h-5 w-5" />
                   </button>
                </div>
                <p className="mt-4 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                   Telesec AI Protocol v4.2 â€¢ Enterprise Intelligence
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

