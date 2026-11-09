"use client";

import { Briefcase, ArrowRight } from "lucide-react";
import { useSalaryPeriodContext } from "@/app/context/salaryPeriod/SalaryPeriodContext";

import { dateFormatter } from "@/app/utils/date";

export default function SalaryPeriods({ setSalaryPeriodId }) {
  const { salaryPeriods } = useSalaryPeriodContext();

  if (
    !salaryPeriods ||
    !Array.isArray(salaryPeriods) ||
    salaryPeriods.length === 0
  ) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-white border border-gray-100 rounded-xl text-center text-gray-500 text-sm">
        No salary periods found.
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto space-y-4">
      {salaryPeriods.map((period) => (
        <div
          key={period.id}
          onClick={() => setSalaryPeriodId(period.id)}
          className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer"
        >
          {/* Left Section: Icon & Period Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 text-base">
                {dateFormatter.getMonthName(period.month, period.year)}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {dateFormatter.formatDate(period.startDate)} –{" "}
                {dateFormatter.formatDate(period.endDate)}
                {period.employeeCount && (
                  <>
                    <span className="mx-1.5">•</span> {period.employeeCount}{" "}
                    employees
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Section: Status & Action */}
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {period.status || "Active"}
            </span>

            {/* Arrow Icon with Hover Effect */}
            <div className="text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
