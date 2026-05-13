"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  GraduationCap,
  ChevronRight,
  Play,
  Shield,
  Zap,
  Cpu,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Trophy,
  Users
} from "lucide-react";
import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingFooter } from "@/components/LandingFooter";
import Image from "next/image";

const categories = [
  { id: "all", name: "All Modules" },
  { id: "beginner", name: "Getting Started" },
  { id: "security", name: "Security Training" },
  { id: "ai", name: "AI Automation" },
  { id: "advanced", name: "Advanced Ops" },
];

const guides = [
  {
    title: "Platform Fundamentals",
    description: "Master the Telesec dashboard, custom widget configuration, and global alert settings.",
    category: "beginner",
    level: "Beginner",
    duration: "10 min",
    icon: BookOpen,
    image: "/hero-1.png",
    featured: true,
    modules: ["Dashboard Customization", "Alert Routing"]
  },
  {
    title: "AI Copilot Mastery",
    description: "Learn how to use natural language queries for real-time network troubleshooting.",
    category: "ai",
    level: "Expert",
    duration: "20 min",
    icon: Cpu,
    image: "/hero-2.png",
    featured: true,
    modules: ["Natural Language Queries", "Guided Resolution"]
  },
  {
    title: "Fraud Detection 101",
    description: "Master SIM box activity monitoring and spoofing pattern identification.",
    category: "security",
    level: "Intermediate",
    duration: "15 min",
    icon: Shield,
    image: "/Dashboard.png",
    featured: true,
  },
  {
    title: "Automation Playbooks",
    description: "Configuring self-healing workflows to reduce manual response efforts.",
    category: "ai",
    level: "Intermediate",
    duration: "12 min",
    icon: Zap,
    image: "/dash01.png",
    featured: true,
  },
  {
    title: "Agent Orchestration",
    description: "Managing operational agents for monitoring and network response.",
    category: "advanced",
    level: "Intermediate",
    duration: "18 min",
    icon: Users,
    image: "/hero-3.png",
  },
  {
    title: "Network CI/CD",
    description: "Implementing continuous integration for network configuration changes.",
    category: "advanced",
    level: "Expert",
    duration: "25 min",
    icon: Zap,
    image: "/heroimage.png",
  },
  {
    title: "Zero Trust Architecture",
    description: "Design and deploy zero-trust frameworks across your enterprise endpoints.",
    category: "security",
    level: "Expert",
    duration: "30 min",
    icon: Shield,
    image: "/login-hero.png",
  },
  {
    title: "Telemetry Analytics",
    description: "Utilize advanced analytics to predict traffic anomalies before they impact users.",
    category: "advanced",
    level: "Intermediate",
    duration: "15 min",
    icon: Search,
    image: "/hero-1.png",
  },
  {
    title: "Cloud Identity Management",
    description: "Secure multi-cloud environments using unified identity access policies.",
    category: "beginner",
    level: "Beginner",
    duration: "20 min",
    icon: Users,
    image: "/hero-3.png",
  },
];

export default function LearningGuidesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const featured = guides.filter(g => g.featured);
  const library = guides.filter(g => {
    const matchesCat = activeCategory === "all" || g.category === activeCategory;
    return matchesCat && !g.featured;
  });

  return (
    <div className="bg-[#0B0C10] min-h-screen text-white font-sans selection:bg-[#41bf63]/30">
      <LandingNavbar />

      <main className="pt-24 pb-20">
        {/* Header Section */}
        <div className="relative overflow-hidden border-b border-white/5 bg-[#13161F]/50 backdrop-blur-md py-12">
          {/* Square Grid Texture Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#41bf63]/5 to-transparent"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41bf63]/10 border border-[#41bf63]/20 mb-5">
                <GraduationCap className="w-3.5 h-3.5 text-[#41bf63]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#41bf63]">Learning Academy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Learning Guides <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41bf63] to-emerald-400">Telesec</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Explore our comprehensive library of guides, tutorials, and deep-dives to become an expert in AI-driven network operations.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Main Body Texture Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_40%,transparent_100%)]"></div>

          <div className="container mx-auto px-6 py-16 relative z-10">
            {/* Featured Section - if "all" or category matches */}
            <AnimatePresence mode="wait">
              {activeCategory === "all" && featured.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-20"
                >
                  <h2 className="text-2xl font-black mb-10 flex items-center gap-3 text-white">
                    <Trophy className="w-6 h-6 text-[#41bf63]" />
                    Featured Learning Paths
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {featured.map((item) => (
                      <div key={item.title} className="group flex flex-col bg-[#13161F] border border-[#41bf63]/20 rounded-[1.5rem] overflow-hidden transition-all hover:border-[#41bf63]/50 shadow-lg shadow-black/40">
                        <div className="relative h-56 w-full overflow-hidden bg-black/50">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] to-transparent"></div>

                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span className="bg-[#0B0C10]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#41bf63] border border-[#41bf63]/20">
                              {item.level}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow relative -mt-8 z-10">
                          <div className="w-12 h-12 rounded-2xl bg-[#0B0C10] flex items-center justify-center border border-[#41bf63]/20 mb-5 shadow-lg">
                            <item.icon className="w-6 h-6 text-[#41bf63]" />
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#41bf63] transition-colors leading-tight">{item.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                              <Clock className="w-3.5 h-3.5" />
                              {item.duration}
                            </div>
                            <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#41bf63] group-hover:translate-x-1 transition-transform">
                              <Play className="w-3 h-3 fill-current" />
                              Start
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Library Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black flex items-center gap-3 text-white">
                  <BookOpen className="w-6 h-6 text-[#41bf63]" />
                  {activeCategory === "all" ? "Latest Resources" : `${categories.find(c => c.id === activeCategory)?.name} Resources`}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  {library.length} {library.length === 1 ? 'Guide' : 'Guides'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {library.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.title}
                    className="group flex flex-col bg-[#13161F] border border-white/5 rounded-[1.25rem] overflow-hidden transition-all hover:bg-white/[0.02] hover:border-[#41bf63]/30"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-black/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] to-transparent"></div>

                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="bg-[#0B0C10]/80 backdrop-blur-md px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest text-[#41bf63] border border-[#41bf63]/20">
                          {categories.find(c => c.id === item.category)?.name || item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="absolute -top-6 right-6 w-12 h-12 rounded-xl bg-[#0B0C10] flex items-center justify-center border border-white/10 shadow-lg">
                        <item.icon className="w-5 h-5 text-[#41bf63]" />
                      </div>

                      <div className="flex items-center justify-between mb-4 mt-2">
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" />
                          {item.duration}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.level}</span>
                      </div>

                      <h4 className="text-lg font-bold mb-3 text-white group-hover:text-[#41bf63] transition-colors leading-tight line-clamp-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-white/5 mt-auto">
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#41bf63] group-hover:translate-x-1 transition-transform">
                          Read Guide
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {library.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32 bg-[#13161F]/50 rounded-[2rem] border border-white/5 border-dashed"
                >
                  <Search className="w-12 h-12 text-slate-600 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">No guides found</h3>
                  <p className="text-slate-400 text-sm">We couldn't find any guides in this category. Try selecting another one.</p>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="mt-6 px-6 py-3 rounded-xl bg-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

