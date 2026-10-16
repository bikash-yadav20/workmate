"use client";
import { toast } from "react-toastify";
import { fetchLeaves } from "@/services/admin/leaves/fetchLeaves";
import { updateLeaveStatus } from "@/services/admin/leaves/updateLeaveStatus";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LeaveCards() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'approved', 'rejected'

  // 1. Fetch real leaves from your Express backend on mount
  useEffect(() => {
    const getLeaves = async () => {
      try {
        const response = await fetchLeaves();
        console.log("response", response);

        if (response && response.success) {
          setLeaves(response.leaves);
        }
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
      } finally {
        setLoading(false);
      }
    };
    getLeaves();
  }, []);

  // 2. Handle status update (Approve/Reject) with instant UI state change (Optimistic Update)
  const handleUpdateStatus = async (employeeId, leaveId, newStatus) => {
    const previousLeaves = [...leaves];
    const statusLower = newStatus.toLowerCase();

    // Instantly update UI locally
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId ? { ...leave, status: statusLower } : leave,
      ),
    );

    try {
      const response = await updateLeaveStatus({
        employeeId,
        leaveId,
        status: statusLower,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status on server. Reverting changes.");
      // Rollback on error
      setLeaves(previousLeaves);
    }
  };

  // Helper to format dates nicely (e.g., "2026-10-15" -> "Oct 15, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate counts for filters
  const counts = {
    all: leaves.length,
    pending: leaves.filter((l) => l.status?.toLowerCase() === "pending").length,
    approved: leaves.filter((l) => l.status?.toLowerCase() === "approved")
      .length,
    rejected: leaves.filter((l) => l.status?.toLowerCase() === "rejected")
      .length,
  };

  // Filtered leaves based on active tab
  const filteredLeaves = leaves.filter((leave) => {
    if (filter === "all") return true;
    return leave.status?.toLowerCase() === filter;
  });

  if (loading) {
    return <div className="p-6 text-gray-500">Loading leave requests...</div>;
  }

  return (
    <div>
      {/* Filter Tab Buttons */}
      <div className="grid grid-cols-2 md:flex gap-3 mb-6">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`p-2 text-xs rounded border cursor-pointer flex items-center gap-1.5 capitalize transition-colors ${
              filter === tab
                ? "bg-gray-300 border-gray-500 font-semibold"
                : "bg-gray-200 border-gray-400 hover:bg-gray-300"
            }`}
          >
            {tab}
            <span className="w-4 h-4 inline-flex items-center justify-center bg-gray-500 rounded-full text-white text-[10px] font-medium">
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Leaves Cards Grid */}
      {filteredLeaves.length === 0 ? (
        <p className="text-gray-500 p-6">No leave requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaves.map((leave) => {
            const statusLower = leave.status?.toLowerCase();
            const appliedFormatted = formatDate(leave.createdAt);
            const fromFormatted = formatDate(leave.fromDate);
            const toFormatted = formatDate(leave.toDate);

            // Calculate duration days dynamically or use a fallback
            const diffTime = Math.abs(
              new Date(leave.toDate) - new Date(leave.fromDate),
            );
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            return (
              <div
                key={leave.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between w-full max-w-[380px]"
              >
                {/* Top Section: Avatar, Name, and Status Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={leave.employee?.profilePicture || "/avatar.png"}
                          fill
                          className="object-cover"
                          alt={leave.employee?.fullName || "Avatar"}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {leave.employee?.fullName || "Unknown Employee"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Applied {appliedFormatted}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        statusLower === "approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : statusLower === "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>

                  {/* Leave Details Grid */}
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {leave.type} Leave
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="text-sm font-medium text-gray-800">
                        {diffDays} {diffDays === 1 ? "day" : "days"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">From</p>
                      <p className="text-sm font-medium text-gray-800">
                        {fromFormatted}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">To</p>
                      <p className="text-sm font-medium text-gray-800">
                        {toFormatted}
                      </p>
                    </div>
                  </div>

                  {/* Reason */}
                  <p className="text-xs text-gray-600 mb-6">
                    <span className="font-semibold text-gray-700">Reason:</span>{" "}
                    {leave.reason}
                  </p>
                </div>

                {/* Action Buttons (Only shown if Pending) */}
                {statusLower === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          leave.id,
                          leave.employee?.id,
                          "reject",
                        )
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ✕ Reject
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          leave.id,
                          leave.employee?.id,
                          "approve",
                        )
                      }
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      ✓ Approve
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
