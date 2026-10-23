"use client";
import Navbar from "@/app/components/Navbar";
import AdvanceStats from "./components/AdvanceStats";
import { useEmployeeContext } from "../employees/context/EmployeesContext";
import PayAdvanceModal from "./components/PayAdvanceModal";
import { useState } from "react";
import EmployeesModal from "./components/EmployeesModal";
import { AdvanceHistory } from "./components/AdvanceHistory";

export default function Page() {
  const { employees } = useEmployeeContext();
  const [activeAdvanceModal, setActiveAdvanceModal] = useState(false);
  const [activeEmployeesModal, setActiveEmployeesModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    fullName: "",
    id: "",
  }); //Id and name;

  const [totalAdvances, setTotalAdvances] = useState(0);
  const [totalAdvanceAmount, setTotalAdvanceAmount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        heading={"Advance Payments"}
        description={"Salary advances issued and repayment tracking"}
      />

      <div>
        <AdvanceStats
          totalAdvances={totalAdvances}
          totalAdvanceAmount={totalAdvanceAmount}
        />
        <AdvanceHistory
          setActiveEmployeesModal={setActiveEmployeesModal}
          setTotalAdvances={setTotalAdvances}
          setTotalAdvanceAmount={setTotalAdvanceAmount}
        />
      </div>
      <div>
        {activeEmployeesModal && (
          <EmployeesModal
            employees={employees}
            setActiveEmployeesModal={setActiveEmployeesModal}
            setActiveAdvanceModal={setActiveAdvanceModal}
            setSelectedEmployee={setSelectedEmployee}
          />
        )}
        {activeAdvanceModal && (
          <PayAdvanceModal
            setActiveAdvanceModal={setActiveAdvanceModal}
            selectedEmployee={selectedEmployee}
          />
        )}
      </div>
    </div>
  );
}
