"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  GitBranch,
  LayoutDashboard,
  Network,
  RadioTower,
  ShieldAlert,
  Siren,
  Workflow,
  Settings,
  BarChart3,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", badge: null },
  { label: "Agent Management", icon: GitBranch, href: "/agent-management", badge: null },
  { label: "Alerts & Incidents", icon: Siren, href: "/alerts", badge: { count: 8, color: "bg-[#00ADEF]" } },
  { label: "Root Cause Analysis", icon: BrainCircuit, href: "/root-cause", badge: null },
  { label: "Network Topology", icon: Network, href: "/network-topology", badge: { count: 5, color: "bg-[#E84E4E]" }, hasDropdown: true },
  { label: "Fiber Monitoring", icon: RadioTower, href: "/fiber-monitoring", badge: null },
  { label: "Fraud Detection", icon: ShieldAlert, href: "/fraud-detection", badge: null, hasDropdown: true },
  { label: "Optimization", icon: ChartNoAxesCombined, href: "/optimization", badge: null },
  { label: "AI Copilot", icon: Bot, href: "/ai-copilot", badge: null },
  { label: "Automation Playbooks", icon: Workflow, href: "/automation-playbooks", badge: null },
  { label: "Settings", icon: Settings, href: "/settings", badge: null },
  { label: "Reports", icon: BarChart3, href: "/reports", badge: null },
  { label: "Help Center", icon: HelpCircle, href: "/help", badge: null }
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden bg-[#0B0D14] transition-all duration-300 lg:block border-r border-white/5 flex flex-col h-full",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Collapse Toggle */}
      <button
        aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
        className="absolute -right-3 top-12 z-40 flex h-7 w-7 items-center justify-center rounded-full border border-white/5 bg-[#13161F] text-white/50 shadow-md transition-all duration-200 hover:text-white"
        onClick={() => setCollapsed((value) => !value)}
        type="button"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>

      {/* Brand/Logo Area */}
      <div className={cn("flex h-20 items-center border-b border-white/5 shrink-0", collapsed ? "justify-center px-3" : "px-6")}>
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-white/5 text-[#41bf63]">
            <Activity className="h-6 w-6" />
          </span>
          <div className={collapsed ? "hidden" : "block"}>
            <span className="block text-lg font-bold tracking-tight text-white uppercase">TeleRoot</span>
            <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mt-0.5">Network Ops</span>
          </div>
        </Link>
      </div>

      <nav 
        className="sidebar-scrollbar overscroll-contain overflow-y-scroll"
        style={{ height: 'calc(100vh - 160px)' }}
      >
        <div className="py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center h-[48px] rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-[#41bf63]/10 text-[#41bf63] border border-[#41bf63]/20 shadow-[0_0_15px_rgba(65,191,99,0.1)]" 
                    : "text-slate-500 hover:bg-white/5 hover:text-white",
                  collapsed ? "justify-center" : "px-4"
                )}
              >
                {/* Icon */}
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-[#41bf63]" : "group-hover:text-white"
                )} />

                {/* Label & Extras */}
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between ml-4">
                    <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                    
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className={cn(
                          "flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[9px] font-bold text-white",
                          item.badge.color
                        )}>
                          {item.badge.count}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer / Environment info */}
      {!collapsed && (
        <div className="shrink-0 p-6 mt-auto">
          <div className="p-4 rounded-xl bg-[#13161F] border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Environment</p>
            <p className="mt-1 text-xs font-bold text-white uppercase flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#41bf63] animate-pulse" />
              Production Network
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
