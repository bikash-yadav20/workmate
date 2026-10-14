import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  Shield,
  Image as ImageIcon,
  X,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

import { useEmployeeContext } from "../context/EmployeesContext";

export default function CreateEmployeeModal({
  setActiveEmployeeForm,
  setActiveSalaryForm,
}) {
  const { employeeFormData, updateBasicData, updateChainedData } =
    useEmployeeContext();

  return (
    <div className="p-6">
      {/* Modal Popup Overlay */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4animate-fadeIn">
        {/* Modal Box */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex w-full justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="  text-lg font-bold text-gray-800">
                  Create New Employee
                </h2>
                <p className="text-xs text-gray-500">
                  Fill in the employee details below.
                </p>
              </div>
              <p>Step 1/3</p>
            </div>
          </div>

          {/* Modal Body / Form (Scrollable) */}
          <form
            onSubmit={() => {
              setActiveSalaryForm(true);
            }}
            className="p-6 overflow-y-auto space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Employee ID */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Employee ID
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Shield size={16} />
                  </span>
                  <input
                    type="text"
                    name="employeeId"
                    value={employeeFormData.employeeId}
                    onChange={(e) => {
                      updateBasicData("employeeId", e.target.value);
                    }}
                    required
                    placeholder="e.g. nishant1"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={employeeFormData.fullName}
                    onChange={(e) => {
                      updateBasicData("fullName", e.target.value);
                    }}
                    required
                    placeholder="e.g. John"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={employeeFormData.email}
                    onChange={(e) => {
                      updateBasicData("email", e.target.value);
                    }}
                    required
                    placeholder="john.doe@acme.com"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={employeeFormData.phone}
                    onChange={(e) => {
                      updateBasicData("phone", e.target.value);
                    }}
                    required
                    placeholder="9487516487"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={employeeFormData.password}
                    onChange={(e) => {
                      updateBasicData("password", e.target.value);
                    }}
                    required
                    placeholder="123456"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={employeeFormData.role}
                  onChange={(e) => {
                    updateBasicData("role", e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={employeeFormData.department}
                  onChange={(e) => {
                    updateBasicData("department", e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setActiveEmployeeForm(false);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-emerald-500 cursor-pointer text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-500 text-white cursor-pointer text-sm font-medium transition-colors shadow-sm"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
