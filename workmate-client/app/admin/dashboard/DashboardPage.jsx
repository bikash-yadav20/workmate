"use client";

import { useContext, useEffect, useState } from "react";

import { employeesCount } from "@/services/admin/employees/employeeCountApi";
import { attendeesCount } from "@/services/admin/employees/attendeesCount";
import DashboardMetrics from "./components/DashboardMetrics";
import { fetchLeaves } from "@/services/admin/leaves/fetchLeaves";
import DashboardNav from "./components/DashboardNav";
import { authenticateContext } from "@/app/context/auth/AuthContext";

export default function DashboardPage() {
  const [employeesCountStatus, setEmployeesCountStatus] = useState({});
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [leavesCount, setLeavesCount] = useState(0);

  const { user } = authenticateContext();

  //get all employee count on basis of there status and present employees (on componen mount)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // fetch total employees
        const totalEmployees = await employeesCount();
        console.log("Total employees", totalEmployees);
        setEmployeesCountStatus({
          totalEmployeesCount: totalEmployees.totalEmployeesCount,
          activeEmployeesCount: totalEmployees.activeEmployeesCount,
          exitedEmployeesCount: totalEmployees.exitedEmployeesCount,
        });

        // fetch present attendees
        const presentCount = await attendeesCount();
        const present = presentCount.attendanceCount;
        setTotalPresent(present);

        //Safely calculate absent using the fresh activeEmployeesCount value
        setTotalAbsent(totalEmployees.activeEmployeesCount - present);

        //fetch pending leaves count
        const leaves = await fetchLeaves();
        setLeavesCount(leaves.pendingLeavesCount);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log("active employees", employeesCountStatus);
  }, [employeesCountStatus]);
  return (
    <div>
      <DashboardNav user={user} />
      <DashboardMetrics
        employeesCountStatus={employeesCountStatus}
        totalAbsent={totalAbsent}
        totalPresent={totalPresent}
        leavesCount={leavesCount}
      />
    </div>
  );
}
