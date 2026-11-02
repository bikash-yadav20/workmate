"use client";

import { X, ArrowRight } from "lucide-react";
import { usePayrollContext } from "../context/PayrollContext";

export default function SalaryPeriodDetailsModal({
  period,
  isOpen,
  onClose,
  onSelectEmployee,
  selectedEmployee,
  salaryPeriodId,
}) {
  const { employees, payrollSlipHandler } = usePayrollContext();

  if (!isOpen || !period) return null;

  // Helper to get initials for the avatar background fallback
  const getInitials = (name) => {
    if (!name) return "EE";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to calculate total or render mock/calculated salary
  const calculateTotalSalary = (salaryObj) => {
    if (!salaryObj) return "$0";
    const total =
      (salaryObj.basicSalary || 0) +
      (salaryObj.allowance || 0) -
      (salaryObj.providentFund || 0);
    return `$${total.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {period.name || `Payroll Period`}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                {period.status || "Active"}
              </span>
              <span className="text-sm text-gray-500">
                {employees.allEmployees.length} employees
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Employee List */}
        <div className="overflow-y-auto divide-y divide-gray-100 p-6 space-y-4">
          {!employees.allEmployees || employees.allEmployees.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No employees found in payroll.
            </div>
          ) : (
            employees.allEmployees.map((emp) => (
              <div
                key={emp.id}
                onClick={async () => {
                  onSelectEmployee && onSelectEmployee(emp);
                  await payrollSlipHandler({
                    salaryPeriodId,
                    employeeId: emp.id,
                  });
                }}
                className="flex items-center justify-between pt-4 first:pt-0 pb-4 last:pb-0 hover:bg-gray-50/50 px-3 rounded-xl transition-colors cursor-pointer group"
              >
                {/* Left: Avatar & Details */}
                <div className="flex items-center gap-3.5">
                  {emp.profilePicture ? (
                    <img
                      src={emp.profilePicture}
                      alt={emp.fullName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs tracking-wider shadow-sm">
                      {getInitials(emp.fullName)}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm">
                      {emp.fullName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {emp.department || emp.role || "Employee"}
                    </span>
                  </div>
                </div>

                {/* Right: Salary Amount & Arrow */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="font-bold text-gray-900 text-sm block">
                      {calculateTotalSalary(emp.salary)}
                    </span>
                    {emp.advance && (
                      <span className="text-[11px] font-medium text-amber-600 block">
                        -{emp.advance} advance
                      </span>
                    )}
                  </div>

                  <div className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
