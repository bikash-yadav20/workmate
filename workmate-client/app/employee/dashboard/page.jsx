"use client";

import { useEffect, useState } from "react";
import { fetchSalaryPeriods } from "@/services/fetchSalaryPeriodsApi";
import ApplyLeave from "./components/ApplyLeave";
import MarkAttendance from "./components/MarkAttendance";

import Stats from "./components/Stats";
import SalaryPeriods from "./components/SalaryPeriods";
import EmployeeSalarySlipModal from "./components/EmployeeSalarySlipModal";
import EmployeeContextProvider from "../context/EmployeeContextProvider";

export default function Page() {
  const [isPresent, setIsPresent] = useState(false);
  const [salaryPeriods, setSalaryPeriods] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState({});

  useEffect(() => {
    const getsalaryPeriod = async () => {
      try {
        const response = await fetchSalaryPeriods();
        setSalaryPeriods(response);
      } catch (error) {}
    };
    getsalaryPeriod();
  }, []);

  return (
    <EmployeeContextProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Top Stats Cards Row */}
          <Stats isPresent={isPresent} salaryPeriods={salaryPeriods} />

          {/* Attendance & Leave Request Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <MarkAttendance setIsPresent={setIsPresent} />
            <ApplyLeave />
          </div>
          <div>
            <h1>Salary Slips & Reports</h1>
            <SalaryPeriods
              setModal={setModal}
              setSelectedPeriod={setSelectedPeriod}
            />
            {modal && (
              <EmployeeSalarySlipModal
                setModal={setModal}
                period={selectedPeriod}
              />
            )}
          </div>
        </main>
      </div>
    </EmployeeContextProvider>
  );
}
