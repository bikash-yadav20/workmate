"use client";

import { X, ArrowLeft, Download } from "lucide-react";
import { usePayrollContext } from "../context/PayrollContext";
import { downloadSlip } from "@/app/utils/downloadSalarySlip";
import { dateFormatter } from "@/app/utils/date";

export default function EmployeeSalarySlipModal({
  isOpen,
  onClose,
  onBack,
  employeeData,
  period,
}) {
  if (!isOpen) return null;

  const { payrollSlipData } = usePayrollContext();

  const data = payrollSlipData.employeePayroll || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Top Navigation / Close Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 shrink-0 bg-white z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Employee Header Profile */}
        <div className="px-6 pb-6 pt-2 border-b border-gray-100 flex items-center gap-3.5 shrink-0 bg-white">
          <div
            className={`w-12 h-12 rounded-full ${data.avatarBg || "bg-indigo-600"} text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm`}
          >
            {data.initials || "SC"}
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-900">
              {employeeData.fullName}
            </h2>
            <p className="text-xs text-gray-500">
              {employeeData.department} ·{" "}
              {dateFormatter.getMonthName(period.month, period.year)}
            </p>
          </div>
        </div>

        {/* Breakdown List Section - Scrollable */}
        <div className="px-6 py-5 space-y-4 text-sm overflow-y-auto flex-1">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Gross Salary</span>
            <span className="font-semibold text-gray-900">
              {employeeData?.salary.basicSalary}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Allowance</span>
            <span className="font-medium text-gray-800">{data.allowance}</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Present Days</span>
            <span className="font-medium text-emerald-600">
              {data.presentDays}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Paid Leave Days</span>
            <span className="font-medium text-gray-800">
              {data.paidLeaveDays}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Weekends</span>
            <span className="font-medium text-gray-800">{data.weekends}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Holidays</span>
            <span className="font-medium text-gray-800">{data.holidays}</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Late Days</span>
            <span className="font-medium text-rose-600">{data.lateDays}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Late Deduction</span>
            <span className="font-medium text-rose-600">
              {data.lateDeduction}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Absent days</span>
            <span className="font-medium text-rose-600">{data.absentDays}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Absent Deduction</span>
            <span className="font-medium text-rose-600">
              {data.absentDeduction}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-gray-500">Advance Deduction</span>
            <span className="font-medium text-gray-400">
              {data.advanceDeduction}
            </span>
          </div>

          {/* Net Payable Highlight Box */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl mt-2">
            <span className="font-semibold text-emerald-900">Net Payable</span>
            <span className="font-bold text-lg text-emerald-600">
              {data.netSalary}
            </span>
          </div>
        </div>

        {/* Modal Footer with Download Button */}
        <div className="p-6 pt-2 bg-white shrink-0 border-t border-gray-50">
          <button
            onClick={() => downloadSlip(employeeData, data, period)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download Salary Slip (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
