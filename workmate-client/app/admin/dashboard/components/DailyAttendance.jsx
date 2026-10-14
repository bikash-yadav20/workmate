import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { useDashboardContext } from "@/app/admin/dashboard/context/DashboardContext";

const statusColors = {
  Present: "bg-green-100 text-green-800",
  Late: "bg-orange-100 text-orange-800",
  Absent: "bg-red-100 text-red-800",
  Leave: "bg-gray-100 text-gray-700",
};
const tags = ["All", "Present", "Late", "Absent", "Leave"];

export default function DailyAttendance() {
  const { attendanceData } = useDashboardContext();
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    console.log(attendanceData[1]?.fullName);
  }, [attendanceData]);

  const filteredData =
    activeTab === "All"
      ? attendanceData
      : attendanceData.filter((item) => item.status === activeTab);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 w-full overflow-hidden">
      {/* Header Section - Stacks on very small screens, row on sm+ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Today's Attendance
        </h2>

        {/* Filter Tabs - Scrollable horizontally on small screens if needed */}
        <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200 overflow-x-auto max-w-full">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap
                ${
                  activeTab === t
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE & TABLET VIEW (< 768px): Card Stack Layout */}
      <div className="block md:hidden space-y-4">
        {filteredData.map((employee) => (
          <div
            key={employee.employeeId}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {employee.avatars ? (
                  <img
                    src={employee.avatar}
                    alt={employee.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-10 h-10 text-gray-300" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {employee?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {employee.role} • {employee.department}
                  </p>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[employee.status] || "bg-gray-100 text-gray-700"}`}
              >
                {employee.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-600 pt-2 border-t border-gray-200/60">
              <span>
                Check-in:{" "}
                <strong className="text-gray-900">{employee.checkIn}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW (>= 768px): Traditional Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-100">
              <th className="pb-4 pl-4 font-medium">EMPLOYEE</th>
              <th className="pb-4 font-medium">DEPARTMENT</th>
              <th className="pb-4 font-medium">STATUS</th>
              <th className="pb-4 font-medium">CHECK-IN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((employee) => (
              <tr
                key={employee.employeeId}
                className="text-sm hover:bg-gray-50"
              >
                <td className="py-4 pl-4">
                  <div className="flex items-center gap-3">
                    {employee.avatar ? (
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-10 h-10 text-gray-300" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {employee.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{employee.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-700">{employee.department}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[employee.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="py-4 text-gray-700 tabular-nums">
                  {employee.checkIn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No employees found with status: {activeTab}
        </div>
      )}
    </div>
  );
}
