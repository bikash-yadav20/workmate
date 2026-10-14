import { Plus, IndianRupee, Briefcase, TrendingUp } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        {/* Create Employee Button */}
        <button className="w-full flex items-center gap-4 p-3.5 rounded-xl  bg-emerald-50/30 text-gray-900 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/60 transition-all text-left">
          <div className="w-9 h-9 flex items-center justify-center text-emerald-600">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            Create Employee
          </span>
        </button>

        {/* Pay Advance Button */}
        <button className="w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/10 transition-all text-left">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <IndianRupee className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            Pay Advance
          </span>
        </button>

        {/* Start Salary Period Button */}
        <button className="w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/10 transition-all text-left">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            Start Salary Period
          </span>
        </button>

        {/* Generate Report Button */}
        <button className="w-full flex items-center gap-4 p-3.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/10 transition-all text-left">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base">
            Generate Report
          </span>
        </button>
      </div>
    </div>
  );
}
