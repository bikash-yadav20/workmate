"use client";

import { useState } from "react";
import { Calendar, Edit3, RotateCcw } from "lucide-react";
import { useEmployeeContext } from "../../context/EmployeeContextProvider";
import { dateFormatter } from "@/app/utils/date";
import { withdrawLeave } from "@/services/employees/leaveApi";
import { toast } from "react-toastify";

export default function LeaveHistory() {
  const { leaveHistory, setLeaveHistory } = useEmployeeContext();
  const [filter, setFilter] = useState("All");

  const filteredData = leaveHistory.filter((item) => {
    if (filter === "All") return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });

  // leave Withdrawal handler
  const withdrawHandler = async (leaveId) => {
    try {
      const response = await withdrawLeave(leaveId);
      console.log("response", response);

      if (response.success) {
        toast.success("Withdrawal successfull");
        setLeaveHistory((prevHistory) =>
          prevHistory.filter((item) => item.id !== leaveId),
        );
      } else {
        toast.error("Something went wrong! Failed to withdraw leave");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full inline-block">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full inline-block">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-rose-700 bg-rose-100 rounded-full inline-block">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 font-sans">
      {/* Outer Card Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              All applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Leave types can be changed while a request is pending.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                  filter === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-4 font-semibold">Leave Type</th>
                <th className="py-4 px-4 font-semibold">Dates</th>
                <th className="py-4 px-4 font-semibold">Duration</th>
                <th className="py-4 px-4 font-semibold">Reason</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredData.map((d, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Leave Type */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        {d.type}
                      </span>
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="text-slate-900 font-medium">
                      {d.fromDate}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      to {d.toDate}
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                    {dateFormatter.getDifferenceInDate(d.fromDate, d.toDate)}
                  </td>

                  {/* Reason */}
                  <td className="py-4 px-4 text-slate-600 max-w-[200px] truncate">
                    {d.reason}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {getStatusBadge(d.status)}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {d.status === "pending" ? (
                      <div className="flex gap-2">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer">
                          <Edit3 className="w-3.5 h-3.5" />
                          Change type
                        </button>
                        <button
                          onClick={() => withdrawHandler(d.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Withdraw
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium select-none">
                        Reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-slate-400 text-sm"
                  >
                    No applications found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
