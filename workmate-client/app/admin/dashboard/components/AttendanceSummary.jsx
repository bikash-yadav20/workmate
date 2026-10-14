import React, { useEffect, useState } from "react";
import { useDashboardContext } from "@/app/admin/dashboard/context/DashboardContext";

export default function AttendanceSummary() {
  const { attendanceData } = useDashboardContext();
  const [summaryData, setSummaryData] = useState({
    present: 0,
    late: 0,
    absent: 0,
    leave: 0,
    total: 0,
  });

  useEffect(() => {
    if (!attendanceData || attendanceData.length === 0) return;
    const count = attendanceData.reduce(
      (acc, curr) => {
        const status = curr.status?.toLowerCase();
        if (status === "present") acc.present += 1;
        else if (status === "late") acc.late += 1;
        else if (status === "absent") acc.absent += 1;
        else if (status === "leave") acc.leave += 1;
        return acc;
      },
      { present: 0, late: 0, absent: 0, leave: 0 },
    );

    setSummaryData({
      present: count.present,
      late: count.late,
      absent: count.absent,
      leave: count.leave,
      total: attendanceData.length,
    });
  }, [attendanceData]);

  const items = [
    {
      label: "Present",
      count: summaryData.present,
      total: summaryData.total,
      color: "bg-emerald-500",
    },
    {
      label: "Late",
      count: summaryData.late,
      total: summaryData.total,
      color: "bg-amber-500",
    },
    {
      label: "Absent",
      count: summaryData.absent,
      total: summaryData.total,
      color: "bg-rose-500",
    },
    {
      label: "On Leave",
      count: summaryData.leave,
      total: summaryData.total,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Attendance Summary
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => {
          // Calculate percentage for the width of the progress bar
          const percentage = (item.count / item.total) * 100;

          return (
            <div key={index} className="space-y-1.5">
              {/* Top row: Label and Ratio text */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="text-gray-900 font-semibold">
                  {item.count}/{item.total}
                </span>
              </div>

              {/* Bottom row: Track and Progress Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
