"use client";
import EmployeeContextProvider from "../context/EmployeeContextProvider";
import LeaveHistory from "./components/LeaveHistory";

export default function Page() {
  return (
    <EmployeeContextProvider>
      <div>
        <LeaveHistory />
      </div>
    </EmployeeContextProvider>
  );
}
