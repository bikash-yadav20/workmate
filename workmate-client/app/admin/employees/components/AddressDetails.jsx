import React, { useState } from "react";
import {
  CreditCard,
  Landmark,
  MapPin,
  Building,
  Globe,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { useEmployeeContext } from "../context/EmployeesContext";

export default function AddressDetails({
  setActiveAddressForm,
  setActiveSalaryForm,
  setActiveEmployeeForm,
}) {
  const { updateChainedData, employeeFormData, createEmployee } =
    useEmployeeContext();
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Bank & Address Details
          </h2>
          <p className="text-xs text-gray-500">
            Provide payment and location information.
          </p>
        </div>
        <p>Step 3/3</p>
      </div>

      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await createEmployee();
          console.log("response from address comp", response);

          if (response.success) {
            setActiveAddressForm(false);
            setActiveEmployeeForm(false);
            setActiveSalaryForm(false);
          }
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Account Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Account Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <CreditCard size={16} />
              </span>
              <input
                type="text"
                name="accountNumber"
                value={employeeFormData.address.accountNumber}
                onChange={(e) => {
                  updateChainedData("address", "accountNumber", e.target.value);
                }}
                required
                placeholder="548754854784"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              IFSC Code
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Landmark size={16} />
              </span>
              <input
                type="text"
                name="ifscCode"
                value={employeeFormData.address.ifscCode}
                onChange={(e) => {
                  updateChainedData("address", "ifscCode", e.target.value);
                }}
                required
                placeholder="FGSF548SS"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm uppercase"
              />
            </div>
          </div>

          {/* Street */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Street Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <MapPin size={16} />
              </span>
              <input
                type="text"
                name="street"
                value={employeeFormData.address.street}
                onChange={(e) => {
                  updateChainedData("address", "street", e.target.value);
                }}
                required
                placeholder="mall road, 123"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              City
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Building size={16} />
              </span>
              <input
                type="text"
                name="city"
                value={employeeFormData.address.city}
                onChange={(e) => {
                  updateChainedData("address", "city", e.target.value);
                }}
                required
                placeholder="pune"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={employeeFormData.address.state}
              onChange={(e) => {
                updateChainedData("address", "state", e.target.value);
              }}
              required
              placeholder="Maharastra"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Country */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Country
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Globe size={16} />
              </span>
              <input
                type="text"
                name="country"
                value={employeeFormData.address.country}
                onChange={(e) => {
                  updateChainedData("address", "country", e.target.value);
                }}
                required
                placeholder="India"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Actions / Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => {
              setActiveAddressForm(false);
              setActiveEmployeeForm(false);
              setActiveSalaryForm(true);
            }}
            className="flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-emerald-500 cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft width={20} />
            Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white text-sm font-medium transition-colors shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
