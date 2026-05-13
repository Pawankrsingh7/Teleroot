"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Clock,
  FileSearch,
  Gauge,
  GitBranch,
  LifeBuoy,
  Network,
  PlayCircle,
  CreditCard,
  Search,
  Settings,
  ShieldAlert,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";

const categories = [
  { label: "All", value: "all" },
  { label: "Platform", value: "platform" },
  { label: "Operations", value: "operations" },
  { label: "Security", value: "security" },
  { label: "Admin", value: "admin" },
];

const featuredResources = [
  {
    title: "TeleSec Project Dashboard",
    desc: "A unified starting point for network health, KPIs, alerts, traffic, topology, risk, and AI-assisted operations.",
    typeLabel: "Platform Guide",
    category: "platform",
    readTime: "6 min read",
    href: "/resources/case-studies",
    icon: Activity,
    color: "#41bf63",
  },
  {
    title: "Root Cause Analysis Workflow",
    desc: "Use AI-driven correlation to identify faults, understand impact, and move incidents from investigation to resolution.",
    typeLabel: "Operations Guide",
    category: "operations",
    readTime: "5 min read",
    href: "/root-cause",
    icon: FileSearch,
    color: "#3b82f6",
  },
  {
    title: "Fraud Command Center",
    desc: "Monitor SIM box activity, spoofing patterns, suspicious users, risk scores, exposure, and response actions.",
    typeLabel: "Security Guide",
    category: "security",
    readTime: "7 min read",
    href: "/fraud-detection",
    icon: ShieldAlert,
    color: "#f97316",
  },
];

const resources = [
  {
    title: "Network Topology Mapping",
    desc: "Visualize network structure, inspect connected systems, and track topology context from one console.",
    typeLabel: "Product Tour",
    category: "platform",
    readTime: "4 min tour",
    href: "/network-topology",
    icon: Network,
  },
  {
    title: "AI Copilot for Network Queries",
    desc: "Ask operational questions in natural language and get guided support for troubleshooting and analysis.",
    typeLabel: "Product Guide",
    category: "platform",
    readTime: "5 min read",
    href: "/ai-copilot",
    icon: Bot,
  },
  {
    title: "Automation Playbooks",
    desc: "Review self-healing workflows that help detect anomalies, trigger actions, and reduce manual response effort.",
    typeLabel: "Workflow Guide",
    category: "operations",
    readTime: "6 min read",
    href: "/automation-playbooks",
    icon: Zap,
  },
  {
    title: "Agent Management",
    desc: "Manage operational agents responsible for monitoring, orchestration, automation, and network response.",
    typeLabel: "Admin Guide",
    category: "admin",
    readTime: "4 min read",
    href: "/agent-management",
    icon: Users,
  },
  {
    title: "Alerts and Incidents",
    desc: "Track active alerts, review incident priority, and keep network operations focused on the highest-risk items.",
    typeLabel: "Operations Guide",
    category: "operations",
    readTime: "5 min read",
    href: "/alerts",
    icon: Bell,
  },
  {
    title: "Fiber Monitoring",
    desc: "Monitor fiber infrastructure health and detect service-impacting conditions before they become wider incidents.",
    typeLabel: "Monitoring Guide",
    category: "operations",
    readTime: "5 min read",
    href: "/fiber-monitoring",
    icon: GitBranch,
  },
  {
    title: "Optimization Analytics",
    desc: "Use performance and capacity signals to understand bottlenecks and improve network efficiency.",
    typeLabel: "Analytics Guide",
    category: "operations",
    readTime: "5 min read",
    href: "/optimization",
    icon: Gauge,
  },
  {
    title: "Reports",
    desc: "Review operational summaries and use reporting views to keep network status visible across the team.",
    typeLabel: "Reporting Guide",
    category: "platform",
    readTime: "3 min read",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Billing and Usage",
    desc: "Understand plan details, usage visibility, and billing-related account areas inside TeleSec.",
    typeLabel: "Account Guide",
    category: "admin",
    readTime: "3 min read",
    href: "/billing-usage",
    icon: WalletCards,
  },
  {
    title: "Settings and Profile",
    desc: "Update workspace preferences, account details, and profile information for day-to-day use.",
    typeLabel: "Setup Guide",
    category: "admin",
    readTime: "3 min read",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help and Support",
    desc: "Use the TeleSec help area when you need support context while working inside the console.",
    typeLabel: "Support Guide",
    category: "admin",
    readTime: "3 min read",
    href: "/help",
    icon: LifeBuoy,
  },
  {
    title: "Pricing Plans",
    desc: "Review TeleSec plan options before choosing or upgrading access for your network operations workspace.",
    typeLabel: "Plan Guide",
    category: "admin",
    readTime: "4 min read",
    href: "/pricing",
    icon: CreditCard,
  },
];

const topics = [
  { label: "Network visibility", icon: Network },
  { label: "AI troubleshooting", icon: Bot },
  { label: "Automation", icon: Zap },
  { label: "Fraud monitoring", icon: ShieldAlert },
  { label: "Incident response", icon: Bell },
  { label: "Usage and settings", icon: Settings },
];

const statCards = [
  { value: "12", label: "Product areas", icon: BookOpen },
  { value: "4", label: "Resource groups", icon: FileSearch },
  { value: "6", label: "Core topics", icon: Network },
  { value: "1", label: "Unified console", icon: Activity },
];

const colorMap: Record<string, string> = {
  platform: "#41bf63",
  operations: "#3b82f6",
  security: "#f97316",
  admin: "#a855f7",
};

export default function ResourceCenterPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "all" || resource.category === activeCategory;
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.desc.toLowerCase().includes(query) ||
        resource.typeLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0D11] text-white">
      <LandingNavbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-[#0B0D11] pb-16 pt-32">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#41bf63]/10 blur-[100px]" />

          <div className="container relative z-10 mx-auto max-w-5xl px-6 text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#41bf63]/30 bg-[#41bf63]/10 px-3 py-1">
                <BookOpen className="h-3.5 w-3.5 text-[#41bf63]" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                  Resource Center
                </span>
              </div>

              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                TeleSec Resources for{" "}
                <span className="text-[#41bf63]">Network Operations</span>
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-400">
                Structured guides for the TeleSec console, covering dashboard
                visibility, topology, root cause analysis, automation, agents,
                fraud detection, optimization, reports, billing, and settings.
              </p>

              <div className="relative mx-auto max-w-2xl">
                <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-[#161a22] shadow-2xl transition-all focus-within:border-[#41bf63]/50 focus-within:ring-1 focus-within:ring-[#41bf63]/50">
                  <Search className="absolute left-6 h-5 w-5 text-slate-400" />
                  <input
                    className="w-full bg-transparent py-4 pl-16 pr-6 text-base text-white outline-none placeholder:text-slate-500"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search TeleSec resources..."
                    type="text"
                    value={search}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-[#0F1117]">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-2 divide-x divide-white/5 md:grid-cols-4">
              {statCards.map((stat, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 px-4 py-6 sm:px-6"
                  initial={{ opacity: 0, y: 10 }}
                  key={stat.label}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#41bf63]/10">
                    <stat.icon className="h-5 w-5 text-[#41bf63]" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0B0D11] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                Start Here
              </p>
              <h2 className="text-3xl font-bold text-white">
                Featured TeleSec Guides
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredResources.map((resource, index) => (
                <ResourceCard
                  featured
                  index={index}
                  key={resource.title}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#0F1117] py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <p className="mb-3 text-center text-[11px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
              Browse By Topic
            </p>
            <h2 className="mb-10 text-center text-2xl font-bold text-white">
              Find the Area You Need
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {topics.map((topic, index) => (
                <motion.div
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  key={topic.label}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <topic.icon className="h-5 w-5 text-[#41bf63]" />
                  </div>
                  <span className="text-center text-[11px] font-bold leading-tight text-slate-300">
                    {topic.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0B0D11] py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                  Library
                </p>
                <h2 className="text-3xl font-bold text-white">
                  All TeleSec Resources
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    className={`pointer-events-none rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                      activeCategory === category.value
                        ? "border-[#41bf63] bg-[#41bf63] text-black"
                        : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                    }`}
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    type="button"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource, index) => (
                  <ResourceCard
                    index={index}
                    key={resource.title}
                    resource={resource}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500">
                <Search className="mx-auto mb-4 h-8 w-8 opacity-30" />
                <p className="text-sm font-medium">
                  No TeleSec resources found for &quot;{search}&quot;.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#0F1117] py-20">
          <div className="container mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#41bf63]/30 bg-[#41bf63]/10 px-4 py-1.5">
                <PlayCircle className="h-4 w-4 text-[#41bf63]" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                  Product Console
                </span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white">
                Continue Learning Inside TeleSec
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-slate-400">
                Open the dashboard to explore the same product areas covered in
                this resource center.
              </p>
              <Link
                className="pointer-events-none inline-flex items-center gap-2 rounded-xl bg-[#41bf63] px-6 py-3 text-sm font-bold text-black transition-all hover:bg-[#bce628]"
                href="/resources/case-studies"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

function ResourceCard({
  featured = false,
  index,
  resource,
}: {
  featured?: boolean;
  index: number;
  resource: {
    title: string;
    desc: string;
    typeLabel: string;
    category: string;
    readTime: string;
    href: string;
    icon: ElementType;
    color?: string;
  };
}) {
  const color = resource.color ?? colorMap[resource.category] ?? "#41bf63";
  const Icon = resource.icon;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] ${
        featured ? "rounded-3xl" : ""
      }`}
      initial={{ opacity: 0, y: 16 }}
      transition={{ delay: index * 0.05 }}
    >
      {featured && (
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(to right, ${color}80, transparent)` }}
        />
      )}
      <div className="flex flex-grow flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${color}18` }}
          >
            <Icon className="h-4 w-4" style={{ color }} />
          </div>
          <span
            className="text-[9px] font-black uppercase tracking-widest"
            style={{ color }}
          >
            {resource.typeLabel}
          </span>
        </div>

        <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-[#41bf63]">
          {resource.title}
        </h3>
        <p className="flex-grow text-[13px] leading-relaxed text-slate-500">
          {resource.desc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="h-3 w-3" />
            <span className="text-[11px] font-medium">{resource.readTime}</span>
          </div>
          <Link
            className="pointer-events-none flex items-center gap-1 text-[11px] font-bold transition-all group-hover:gap-2"
            href={resource.href}
            style={{ color }}
          >
            Open
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

