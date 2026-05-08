import { fraudAlerts, fiberRiskNodes } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const dotClass = {
  danger: "bg-red-500",
  warning: "bg-orange-500",
  success: "bg-[#41bf63]"
};

function RiskList({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; status: string }>;
}) {
  return (
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</h3>
      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-xs font-bold text-slate-300 transition-all duration-300 hover:border-white/10 hover:text-white"
          >
            <span className={cn("h-2 w-2 rounded-full", dotClass[item.status as keyof typeof dotClass])} />
            <span className="tracking-wide">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RiskPanel() {
  return (
    <div className="space-y-8">
      <RiskList items={fraudAlerts} title="Fraud Alerts" />
      <RiskList items={fiberRiskNodes} title="Fiber Risk Nodes" />
      <button className="w-full mt-2 text-center text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors py-2">
        View all risks →
      </button>
    </div>
  );
}
