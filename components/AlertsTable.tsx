import { alerts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const severityTone = {
  Critical: "danger",
  Major: "warning",
  Normal: "success"
} as const;

export function AlertsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-[#1a1e29]/30 text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black border-b border-white/5">
          <tr>
            {["ID", "Severity", "Device", "Issue", "Status", "Time"].map((header) => (
              <th key={header} className="px-6 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.02]">
          {alerts.map((alert) => (
            <tr key={alert.id} className="transition-all duration-200 hover:bg-white/[0.02] group">
              <td className="px-6 py-4 font-bold text-white tracking-wider">{alert.id}</td>
              <td className="px-6 py-4">
                <Badge tone={severityTone[alert.severity as keyof typeof severityTone]}>
                  {alert.severity}
                </Badge>
              </td>
              <td className="px-6 py-4 font-bold text-slate-300">{alert.device}</td>
              <td className="px-6 py-4 font-bold text-slate-400 group-hover:text-white transition-colors">{alert.issue}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    alert.status === 'Investigating' ? 'bg-[#41bf63] animate-pulse' : 'bg-slate-500'
                  }`} />
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{alert.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-slate-600 text-[10px] uppercase tracking-widest">{alert.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
