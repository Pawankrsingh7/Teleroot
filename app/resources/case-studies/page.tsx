"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Network,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";

const caseStudies = [
  {
    title: "Unified Network Command View",
    label: "Dashboard Case Study",
    href: "/resources/center",
    icon: Activity,
    summary:
      "How TeleSec brings KPIs, topology, alerts, risk, traffic, and AI-assisted operations into one console view.",
    challenge:
      "Network teams need a single place to understand current health without switching between disconnected screens.",
    approach:
      "The dashboard combines live status cards, traffic context, topology visibility, root cause summaries, risk signals, and playbook access.",
    outcome:
      "Operators can start from one command view and move quickly into the exact area that needs attention.",
    metrics: ["KPI overview", "Topology context", "Alert visibility"],
    color: "#41bf63",
  },
  {
    title: "Root Cause Investigation Flow",
    label: "RCA Case Study",
    href: "/root-cause",
    icon: FileSearch,
    summary:
      "How TeleSec structures incident investigation with AI-supported root cause context and action-ready findings.",
    challenge:
      "Fault investigation can slow down when alerts, affected services, and probable causes are not shown together.",
    approach:
      "Root Cause Analysis connects incident signals with AI reasoning, related network context, and clear next steps.",
    outcome:
      "Teams get a cleaner path from alert review to resolution planning inside the TeleSec workspace.",
    metrics: ["Incident context", "AI analysis", "Resolution guidance"],
    color: "#3b82f6",
  },
  {
    title: "Fraud Monitoring and Response",
    label: "Security Case Study",
    href: "/fraud-detection",
    icon: ShieldAlert,
    summary:
      "How TeleSec tracks suspicious calling behavior, user risk, SIM box patterns, and response actions.",
    challenge:
      "Fraud signals need to be visible with user-level context, exposure details, and quick operational controls.",
    approach:
      "The fraud command center organizes active alerts, high-risk users, fraud mix, call volume, cost exposure, and block or monitor actions.",
    outcome:
      "Security and operations teams can review suspicious activity and act from the same focused interface.",
    metrics: ["Risk scoring", "Fraud alerts", "Response actions"],
    color: "#f97316",
  },
];

const workflowStudies = [
  {
    title: "Automation Playbook Execution",
    desc: "Use automation playbooks to support repeatable incident response and reduce manual work across common network events.",
    icon: Zap,
  },
  {
    title: "Fiber Health Monitoring",
    desc: "Review fiber monitoring views to keep infrastructure health visible before service-impacting conditions grow.",
    icon: GitBranch,
  },
  {
    title: "Topology-Aware Operations",
    desc: "Use topology mapping to understand connected systems and inspect network structure during operations.",
    icon: Network,
  },
  {
    title: "Optimization Analytics",
    desc: "Use performance and capacity signals to understand bottlenecks and improve network efficiency.",
    icon: BarChart3,
  },
  {
    title: "AI Copilot Support",
    desc: "Ask operational questions in natural language and use guided responses while troubleshooting.",
    icon: Bot,
  },
  {
    title: "Alerts and Incident Focus",
    desc: "Track active alerts, priority, and incident context so teams can focus on the most important items first.",
    icon: Bell,
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0B0C10] text-white">
      <div className="absolute left-0 right-0 top-0 z-10 h-[100px] bg-[#0B0C10]" />
      <LandingNavbar />

      <main className="relative z-10 flex-grow pt-20">
        {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="relative overflow-hidden py-10">
          {/* Background Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-[-10%] top-[-10%] h-[300px] w-[300px] rounded-full bg-[#41bf63] blur-[120px]" />
            <div className="absolute right-[-12%] top-[18%] h-[240px] w-[240px] rounded-full bg-[#41bf63] blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#41bf63]/30 bg-[#41bf63]/10 px-4 py-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#41bf63]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                    TeleSec Case Studies
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  Practical Network Operations Stories From the TeleSec Console
                </h1>
                <p className="mt-4 max-w-2xl text-[13px] font-medium leading-relaxed text-slate-500 md:text-sm">
                  Structured case studies based on TeleSec project workflows:
                  dashboard visibility, root cause analysis, fraud detection,
                  automation, topology, fiber monitoring, AI copilot support,
                  alerts, reports, billing, and settings.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-[#41bf63] px-6 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#0B0C10] transition hover:bg-[#6ee7a0] hover:shadow-[0_0_20px_rgba(65,191,99,0.2)]"
                    href="/resources/center"
                  >
                    Browse Resources
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    className="pointer-events-none inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition hover:border-[#41bf63]/40 hover:bg-[#41bf63]/10"
                    href="/resources/center"
                  >
                    Resource Center
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Featured Workflows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="border-y border-white/5 bg-[#13161F]/50 backdrop-blur-sm py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
                Featured Studies
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Core TeleSec Workflows
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {caseStudies.map((study, index) => (
                <motion.article
                  className="group flex min-h-[460px] flex-col overflow-hidden rounded-[20px] border border-white/5 bg-[#0B0C10]/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#41bf63]/40"
                  initial={{ opacity: 0, y: 18 }}
                  key={study.title}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(to right, ${study.color}, transparent)`,
                    }}
                  />
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${study.color}18` }}
                      >
                        <study.icon
                          className="h-6 w-6"
                          style={{ color: study.color }}
                        />
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest"
                        style={{
                          borderColor: `${study.color}40`,
                          color: study.color,
                          backgroundColor: `${study.color}12`,
                        }}
                      >
                        {study.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-tight text-white transition-colors group-hover:text-[#41bf63]">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                      {study.summary}
                    </p>

                    <div className="mt-6 space-y-4">
                      <InfoBlock title="Challenge" text={study.challenge} />
                      <InfoBlock title="Approach" text={study.approach} />
                      <InfoBlock title="Outcome" text={study.outcome} />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.metrics.map((metric) => (
                        <span
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-300"
                          key={metric}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <span
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-wider"
                      style={{ color: study.color }}
                    >
                      View Module
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* â”€â”€ Additional Scenarios â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="bg-[#0B0C10]/50 py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
                  More Scenarios
                </p>
                <h2 className="text-3xl font-bold text-white">
                  Additional TeleSec Case Areas
                </h2>
              </div>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-500">
                Each scenario maps to an existing TeleSec page, keeping the
                case study library focused on your actual project.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workflowStudies.map((study, index) => (
                <motion.div
                  className="group rounded-[18px] border border-white/5 bg-[#13161F]/80 backdrop-blur-sm p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-[#41bf63]/30"
                  initial={{ opacity: 0, y: 14 }}
                  key={study.title}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#41bf63]/10 text-[#41bf63]">
                    <study.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {study.title}
                  </h3>
                  <p className="mt-2 min-h-[64px] text-sm font-medium leading-relaxed text-slate-500">
                    {study.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#41bf63]">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="border-t border-white/5 bg-[#13161F]/80 backdrop-blur-md py-16">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
              Continue
            </p>
            <h2 className="text-3xl font-bold text-white">
              Explore the Full TeleSec Resource Center
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Use the resource center to browse guides for dashboard,
              operations, security, admin, billing, settings, and support areas.
            </p>
            <Link
              className="pointer-events-none mt-8 inline-flex items-center gap-2 rounded-full bg-[#41bf63] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0B0C10] transition hover:bg-[#6ee7a0]"
              href="/resources/center"
            >
              Browse Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#41bf63]">
        {title}
      </p>
      <p className="text-xs font-medium leading-relaxed text-slate-500">
        {text}
      </p>
    </div>
  );
}

