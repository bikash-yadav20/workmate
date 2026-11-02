"use client";
import Navbar from "@/app/components/Navbar";
import PayrollStats from "./components/PayrollStats";
import SalaryPeriods from "./components/SalaryPeriods";
import { useState } from "react";
import PayrollContextProvider from "./context/PayrollContext";
import SalaryPeriodDetailsModal from "./components/SalaryPeriodDetailsModal";
import { useSalaryPeriodContext } from "@/app/context/salaryPeriod/SalaryPeriodContext";
import EmployeeSalarySlipModal from "./components/EmployeeSalarySlipModal";

function PageContent() {
  const [salaryPeriodId, setSalaryPeriodId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { salaryPeriods } = useSalaryPeriodContext();

  // Find the full period object matching the clicked ID
  const selectedPeriod = salaryPeriods?.find((p) => p.id === salaryPeriodId);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar
        heading={"Payroll & Salary Periods"}
        description={"Manage pay cycles and generate payroll reports"}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <PayrollStats />
        <SalaryPeriods setSalaryPeriodId={setSalaryPeriodId} />

        {/* Period Details Modal */}
        <SalaryPeriodDetailsModal
          period={selectedPeriod}
          isOpen={!!salaryPeriodId && !selectedEmployee}
          onClose={() => setSalaryPeriodId(null)}
          onSelectEmployee={(emp) => setSelectedEmployee(emp)}
          selectedEmployee={selectedEmployee}
          salaryPeriodId={salaryPeriodId}
        />

        {/* Individual Employee Salary Slip Modal */}
        <EmployeeSalarySlipModal
          isOpen={!!selectedEmployee}
          onClose={() => {
            setSelectedEmployee(null);
            setSalaryPeriodId(null);
          }}
          onBack={() => setSelectedEmployee(null)}
          employeeData={selectedEmployee}
          period={selectedPeriod}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <PayrollContextProvider>
      <PageContent />
    </PayrollContextProvider>
  );
}
