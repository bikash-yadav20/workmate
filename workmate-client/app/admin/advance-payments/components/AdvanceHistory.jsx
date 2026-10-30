"use client";
import { useSalaryPeriodContext } from "@/app/context/salaryPeriod/SalaryPeriodContext";
import { fetchAdvaceHistory } from "@/services/admin/payments/advanceHistory";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function AdvanceHistory({
  setActiveEmployeesModal,
  setTotalAdvanceAmount,
  setTotalAdvances,
}) {
  const { salaryPeriods } = useSalaryPeriodContext();

  const [selectedPeriod, setSelectedPeriod] = useState("");

  // Automatically set the latest draft period once salaryPeriods load
  useEffect(() => {
    if (salaryPeriods && salaryPeriods.length > 0 && !selectedPeriod) {
      // Find the first/latest period with status "draft"
      const latestDraft = salaryPeriods.find((s) => s.status === "draft");

      if (latestDraft) {
        setSelectedPeriod(`${latestDraft.startDate} - ${latestDraft.endDate}`);
      } else {
        // Optional fallback: if no draft exists, default to the absolute latest period
        const latest = salaryPeriods[0];
        setSelectedPeriod(`${latest.startDate} - ${latest.endDate}`);
      }
    }
  }, [salaryPeriods, selectedPeriod]);

  const [advanceHistory, setAdvanceHistory] = useState([]);

  const fetchAdvancePaymentHistory = async (periodToFetch) => {
    const targetPeriod = periodToFetch || selectedPeriod;

    if (!targetPeriod) {
      return;
    }

    try {
      const response = await fetchAdvaceHistory(targetPeriod);
      if (response) {
        // Extract the inner array safely
        setAdvanceHistory(response.advanceHistory || []);
        setTotalAdvances(response.advanceHistory.length);

        if (response.message) {
          toast.success(response.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch advance history");
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchAdvancePaymentHistory(selectedPeriod);
    }
  }, [selectedPeriod]);

  // calculate total amount paid on selected period
  useEffect(() => {
    const total = advanceHistory.reduce((sum, currenValue) => {
      return sum + Number(currenValue.advanceAmount || 0);
    }, 0);

    setTotalAdvanceAmount(total);
  }, [advanceHistory]);

  return (
    <div className="flex flex-col w-full rounded-xl bg-white shadow-sm border border-gray-100 p-6 mt-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <h2 className="text-gray-800 font-bold text-xl">Advance History</h2>
          <select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
            }}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Salary Period</option>
            {salaryPeriods?.map((s, index) => {
              const periodValue = `${s.startDate} - ${s.endDate}`;
              return (
                <option key={index} value={periodValue}>
                  {periodValue}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={() => setActiveEmployeesModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors duration-300 px-4 py-2 rounded-lg shadow-sm cursor-pointer"
        >
          + Pay New Advance
        </button>
      </div>

      {/* Professional Table section */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Employee</th>
              <th className="py-3.5 px-4 font-semibold">Employee ID</th>
              <th className="py-3.5 px-4 font-semibold">Amount</th>
              <th className="py-3.5 px-4 font-semibold">Issue Date</th>
              <th className="py-3.5 px-4 font-semibold">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.isArray(advanceHistory) && advanceHistory.length > 0 ? (
              advanceHistory.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Accessing nested employee object properties */}
                  <td className="py-3.5 px-4 font-medium text-gray-900">
                    {item.employee?.fullName || "N/A"}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {item.employee?.employeeId || "N/A"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">
                    ₹{item.advanceAmount}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    {item.paymentDate}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 italic">
                    {item.reason || "No reason provided"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  {selectedPeriod
                    ? "No advance history found for this period."
                    : "Please select a salary period to view history."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
