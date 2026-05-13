"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Download, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Network,
  Layers,
  ChevronRight,
  Filter,
  CheckCircle2
} from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingFooter } from "@/components/LandingFooter";

const categories = [
  { id: "all", name: "All Resources" },
  { id: "ai", name: "AI Intelligence" },
  { id: "security", name: "Cyber Security" },
  { id: "infrastructure", name: "Core Infrastructure" },
];

const solutions = [
  {
    title: "AI-Driven Fraud Prevention",
    description: "Technical specifications for our real-time SIM box detection and spoofing prevention engine.",
    category: "security",
    features: ["Real-time Risk Scoring", "Automated Mitigation"],
    icon: ShieldCheck,
    color: "#41bf63",
    featured: true
  },
  {
    title: "Autonomous Agent Orchestration",
    description: "Deep dive into how Telesec AI agents manage complex network workflows autonomously.",
    category: "ai",
    features: ["Self-Healing Workflows", "LLM Processing"],
    icon: Cpu,
    color: "#a855f7",
    featured: true
  },
  {
    title: "Next-Gen Fiber Monitoring",
    description: "Architectural overview of our fiber health tracking system and predictive algorithms.",
    category: "infrastructure",
    icon: Network,
    color: "#3b82f6"
  },
  {
    title: "Network KPI Analytics",
    description: "Detailed breakdown of the telemetry data processed by Telesec.",
    category: "all",
    icon: BarChart3,
    color: "#f59e0b"
  },
  {
    title: "Multi-Cloud Network Sync",
    description: "Solution overview for enterprises managing hybrid and multi-cloud topologies.",
    category: "infrastructure",
    icon: Layers,
    color: "#14b8a6"
  },
  {
    title: "Zero-Trust Network Access",
    description: "Implementation guide for Telesec's IAM-gated network access.",
    category: "security",
    icon: Zap,
    color: "#f43f5e"
  },
];

export default function SolutionSheetsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const featured = solutions.filter(s => s.featured);
  const library = solutions.filter(s => {
    const matchesCat = activeCategory === "all" || s.category === activeCategory;
    return matchesCat && !s.featured;
  });

  return (
    <div className="bg-[#0B0C10] min-h-screen text-white font-sans selection:bg-[#41bf63]/30">
      <LandingNavbar />

      <main className="pt-24">
        {/* Header Section - More Compact & Professional */}
        <div className="border-b border-white/5 bg-[#13161F]/30 backdrop-blur-md">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-[#41bf63] mb-4">
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Technical Library</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Solution Sheets</h1>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Access enterprise-grade technical documentation and architectural blueprints for the Telesec Intelligence Platform.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search sheets..." 
                    className="bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#41bf63]/50 w-64"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          {/* Featured Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#41bf63]" />
                Featured Solutions
              </h2>
              <div className="h-px flex-grow mx-6 bg-white/5 hidden md:block"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((item) => (
                <div key={item.title} className="group relative bg-[#13161F] border border-[#41bf63]/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 transition-all hover:border-[#41bf63]/50">
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#41bf63]/10 flex items-center justify-center border border-[#41bf63]/20">
                    <item.icon className="w-8 h-8 text-[#41bf63]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#41bf63] bg-[#41bf63]/10 px-2 py-0.5 rounded">Core Tech</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-[#41bf63] transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {item.features?.map(f => (
                        <div key={f} className="flex items-center gap-2 text-[11px] text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#41bf63]" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 bg-[#41bf63] text-[#0B0C10] px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                      <Download className="w-3.5 h-3.5" />
                      Download Solution Sheet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Library Section with Sidebar-like filtering */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filter */}
            <div className="lg:w-64 shrink-0">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat.id 
                        ? "bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {library.map((item) => (
                  <div key={item.title} className="bg-[#13161F] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.02] hover:border-white/10 group">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6">{item.description}</p>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#41bf63] flex items-center gap-2 group/btn">
                      View Details
                      <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

