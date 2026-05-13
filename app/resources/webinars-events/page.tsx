"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileSearch,
  GitBranch,
  Network,
  ShieldAlert,
  Users,
  Video,
} from "lucide-react";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingNavbar } from "@/components/LandingNavbar";

const featuredSessions = [
  {
    title: "TeleSec Console Walkthrough",
    type: "Product Session",
    duration: "45 min",
    icon: Activity,
    color: "#41bf63",
    overview:
      "A structured walkthrough of the TeleSec console, from network visibility to alerts, reports, and workspace controls.",
    topics: ["Dashboard view", "Alerts overview", "Reports and settings"],
  },
  {
    title: "Root Cause and Automation Workflow",
    type: "Operations Session",
    duration: "40 min",
    icon: FileSearch,
    color: "#3b82f6",
    overview:
      "A focused session on how root cause analysis and automation playbooks support faster incident investigation.",
    topics: ["Root cause context", "Playbook flow", "Incident handoff"],
  },
  {
    title: "Fraud Detection Command Review",
    type: "Security Session",
    duration: "35 min",
    icon: ShieldAlert,
    color: "#f97316",
    overview:
      "A project-focused review of fraud alerts, high-risk users, suspicious call patterns, and response controls.",
    topics: ["Risk scoring", "Fraud mix", "Response actions"],
  },
];

const eventTracks = [
  {
    title: "Network Topology Review",
    desc: "Review how topology mapping helps teams understand connected systems during live operations.",
    icon: Network,
  },
  {
    title: "AI Copilot Session",
    desc: "Explore how natural language queries can support network troubleshooting and operational analysis.",
    icon: Bot,
  },
  {
    title: "Fiber Monitoring Session",
    desc: "Walk through fiber infrastructure health views and monitoring context inside TeleSec.",
    icon: GitBranch,
  },
  {
    title: "Optimization Analytics Review",
    desc: "Review performance and capacity signals used to understand bottlenecks and improve efficiency.",
    icon: BarChart3,
  },
  {
    title: "Agent Management Session",
    desc: "Understand how operational agents support monitoring, orchestration, and automation workflows.",
    icon: Users,
  },
  {
    title: "Alerts and Incident Review",
    desc: "Walk through active alert handling, priority context, and incident focus inside the console.",
    icon: Bell,
  },
];

export default function WebinarsEventsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0B0C10] text-white">
      <div className="absolute left-0 right-0 top-0 z-0 h-[100px] bg-[#0B0C10]" />
      <LandingNavbar />

      <main className="relative z-10 flex-grow pt-24">
        <section className="relative overflow-hidden py-10">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute left-[-12%] top-[-20%] h-[320px] w-[320px] rounded-full bg-[#41bf63] blur-[130px]" />
            <div className="absolute right-[-10%] top-[10%] h-[260px] w-[260px] rounded-full bg-[#41bf63] blur-[130px]" />
          </div>

          <div className="container relative z-10 mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#41bf63]/30 bg-[#41bf63]/10 px-3 py-1">
                  <Video className="h-3.5 w-3.5 text-[#41bf63]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#41bf63]">
                    Webinars & Events
                  </span>
                </div>

                <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  TeleSec Sessions for Network Operations Teams
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
                  Project-based webinar and event content for the TeleSec
                  platform: dashboard visibility, topology, root cause
                  analysis, automation, agents, alerts, fraud detection, fiber
                  monitoring, optimization, reports, billing, and settings.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    className="inline-flex items-center gap-2 rounded-full bg-[#41bf63] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#0B0C10] transition hover:bg-[#6ee7a0]"
                    href="/resources/center"
                  >
                    Resource Center
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:border-[#41bf63]/40 hover:bg-[#41bf63]/10"
                    href="/resources/case-studies"
                  >
                    Case Studies
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#13161F] py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
                Featured Sessions
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                TeleSec Webinar Library
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredSessions.map((session, index) => (
                <motion.article
                  className="group flex min-h-[380px] flex-col overflow-hidden rounded-[20px] border border-white/5 bg-[#0B0C10] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#41bf63]/40"
                  initial={{ opacity: 0, y: 18 }}
                  key={session.title}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(to right, ${session.color}, transparent)`,
                    }}
                  />
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${session.color}18` }}
                      >
                        <session.icon
                          className="h-6 w-6"
                          style={{ color: session.color }}
                        />
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest"
                        style={{
                          borderColor: `${session.color}40`,
                          color: session.color,
                          backgroundColor: `${session.color}12`,
                        }}
                      >
                        {session.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-tight text-white transition-colors group-hover:text-[#41bf63]">
                      {session.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                      {session.overview}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Clock className="h-4 w-4 text-[#41bf63]" />
                      {session.duration}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {session.topics.map((topic) => (
                        <span
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-300"
                          key={topic}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <span
                      className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-wider"
                      style={{ color: session.color }}
                    >
                      Session Planned
                      <CalendarDays className="h-4 w-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0B0C10] py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
                  Event Tracks
                </p>
                <h2 className="text-3xl font-bold text-white">
                  Additional TeleSec Sessions
                </h2>
              </div>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-500">
                Each track is based on an existing TeleSec project area and is
                written as a structured product learning session.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {eventTracks.map((track, index) => (
                <motion.div
                  className="group rounded-[18px] border border-white/5 bg-[#13161F] p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-[#41bf63]/30"
                  initial={{ opacity: 0, y: 14 }}
                  key={track.title}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#41bf63]/10 text-[#41bf63]">
                    <track.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {track.title}
                  </h3>
                  <p className="mt-2 min-h-[64px] text-sm font-medium leading-relaxed text-slate-500">
                    {track.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#41bf63]">
                    Session Track
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-[#13161F] py-16">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#41bf63]">
              Continue Learning
            </p>
            <h2 className="text-3xl font-bold text-white">
              Browse TeleSec Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Explore structured guides and case studies for the same TeleSec
              product areas covered in these sessions.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#41bf63] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#0B0C10] transition hover:bg-[#6ee7a0]"
              href="/resources/center"
            >
              Open Resource Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

