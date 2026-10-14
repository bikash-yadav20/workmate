"use client";

import { useEffect, useState } from "react";

import { employeesCount } from "@/services/admin/employees/employeeCountApi";
import { attendeesCount } from "@/services/admin/employees/attendeesCount";
import DashboardMetrics from "./components/DashboardMetrics";
import { fetchLeaves } from "@/services/admin/leaves/fetchLeaves";

import { authenticateContext } from "@/app/context/auth/AuthContext";
import DailyAttendance from "./components/DailyAttendance";
import QuickActions from "./components/QuickActions";
import AttendanceSummary from "./components/AttendanceSummary";
import Navbar from "@/app/components/Navbar";
import { userInfoContext } from "@/app/context/userContext/UserContext";

export default function DashboardPage() {
  const [employeesCountStatus, setEmployeesCountStatus] = useState({});
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [leavesCount, setLeavesCount] = useState(0);

  const { user } = authenticateContext();
  const { userInfo } = userInfoContext();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const totalEmployees = await employeesCount();

        setEmployeesCountStatus({
          totalEmployeesCount: totalEmployees.totalEmployeesCount,
          activeEmployeesCount: totalEmployees.activeEmployeesCount,
          exitedEmployeesCount: totalEmployees.exitedEmployeesCount,
        });

        const presentCount = await attendeesCount();
        const present = presentCount.attendanceCount;
        setTotalPresent(present);

        setTotalAbsent(totalEmployees.activeEmployeesCount - present);

        const leaves = await fetchLeaves();
        setLeavesCount(leaves.pendingLeavesCount);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  const description = `Welcome back, ${userInfo?.fullName}. Here's what's happening today.`;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <Navbar heading={"Dashboard"} description={description} />
      <DashboardMetrics
        employeesCountStatus={employeesCountStatus}
        totalAbsent={totalAbsent}
        totalPresent={totalPresent}
        leavesCount={leavesCount}
      />

      {/* Grid Layout: DailyAttendance (2 cols) + QuickActions (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <DailyAttendance />
        </div>
        <div className="flex flex-col gap-4">
          <QuickActions />
          <AttendanceSummary />
        </div>
      </div>
    </div>
  );
}
