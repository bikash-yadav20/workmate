import React, { useState } from "react";
import {
  DollarSign,
  ShieldAlert,
  PlusCircle,
  X,
  ArrowLeft,
} from "lucide-react";

import { useEmployeeContext } from "../context/EmployeesContext";

export default function SalaryDetails({
  setActiveSalaryForm,
  setActiveEmployeeForm,
  setActiveAddressForm,
}) {
  const { updateChainedData, employeeFormData } = useEmployeeContext();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Salary Configuration
          </h2>
          <p className="text-xs text-gray-500">
            Set basic salary, deductions, and allowances.
          </p>
        </div>
        <p>Step 2/3</p>
      </div>

      <form
        onSubmit={() => {
          setActiveSalaryForm(false);
          setActiveEmployeeForm(false);
          setActiveAddressForm(true);
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Basic Salary */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Basic Salary
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <DollarSign size={16} />
              </span>
              <input
                type="number"
                name="basicSalary"
                value={employeeFormData.salary.basicSalary}
                onChange={(e) => {
                  updateChainedData("salary", "basicSalary", +e.target.value);
                }}
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Provident Fund */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Provident Fund (Deduction)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <ShieldAlert size={16} />
              </span>
              <input
                type="number"
                name="providendFund"
                value={employeeFormData.salary.providendFund}
                onChange={(e) => {
                  updateChainedData("salary", "providendFund", +e.target.value);
                }}
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Allowance */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Allowance
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <PlusCircle size={16} />
              </span>
              <input
                type="number"
                name="allowance"
                value={employeeFormData.salary.allowance}
                onChange={(e) => {
                  updateChainedData("salary", "allowance", +e.target.value);
                }}
                required
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Net Salary Preview Banner */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">
            <span className="text-sm font-medium text-blue-900">
              Calculated Net Salary:
            </span>
            <span className="text-lg font-bold text-blue-700">
              ₹
              {Number(
                employeeFormData.salary.basicSalary +
                  employeeFormData.salary.allowance,
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              setActiveSalaryForm(false);
              setActiveEmployeeForm(true);
            }}
            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-emerald-500 cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft width={20} />
            Back
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white text-sm font-medium transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
