"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchLeaves } from "@/services/admin/leaves/fetchLeaves";

import { dailyAttendanceLogs } from "@/services/admin/employees/attendanceLogsApi";

const DashboardContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState({});

  //fetch attendance log from database
  useEffect(() => {
    const attendanceLogs = async () => {
      const logs = await dailyAttendanceLogs();
      setAttendanceData(logs.dashboardData);
    };
    attendanceLogs();
  }, []);

  // //fetch pending leaves
  // useEffect(() => {
  //   async function getEmployeeLeaves() {
  //     try {
  //       const leaves = await fetchLeaves();
  //       console.log("pending leaves", leaves);
  //       setPendingLeaves(leaves);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }

  //   getEmployeeLeaves();
  // }, []);

  return (
    <DashboardContext.Provider
      value={{
        attendanceData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// make easy to import and use context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "dashboard context must be used within a DashboardContextProvider",
    );
  }
  return context;
};
