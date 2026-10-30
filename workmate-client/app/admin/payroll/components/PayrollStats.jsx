import { BarChart3 } from "lucide-react";
import { useState } from "react";
export default function PayrollStats() {
  return (
    <div className="bg-slate-900 border border-slate-900 rounded-xl px-6 py-4 flex items-center justify-between">
      <div className="text-white flex flex-col gap-2">
        <p className="text-slate-400 text-sm">Current Active Period</p>
        <p className="text-2xl font-bold">September 2026</p>
        <p className="text-slate-400 text-sm">
          Sep 1 - Sep 30 24 days elapsed 6 remaining
        </p>
      </div>
      <div className="flex gap-4">
        <div>
          <p className="text-xs text-end font-medium text-slate-400">
            Projected Total
          </p>
          <p className="text-3xl font-bold text-emerald-400">-----</p>
        </div>
        <button className="flex gap-2 text-white items-center font-medium bg-emerald-400 hover:bg-emerald-500 rounded px-4 py-2 cursor-pointer">
          <BarChart3 width={25} /> Generate Monthly Report
        </button>
      </div>
    </div>
  );
}
