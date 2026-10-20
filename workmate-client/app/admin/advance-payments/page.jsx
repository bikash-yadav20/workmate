"use client";
import Navbar from "@/app/components/Navbar";
import AdvanceStats from "./components/AdvanceStats";
import { useEmployeeContext } from "../employees/context/EmployeesContext";
import PayAdvanceModal from "./components/PayAdvanceModal";
import { useState } from "react";
import EmployeesModal from "./components/EmployeesModal";

export default function Page() {
  const { employees } = useEmployeeContext();
  const [activeAdvanceModal, setActiveAdvanceModal] = useState(false);
  const [activeEmployeesModal, setActiveEmployeesModal] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState({
    fullName: "",
    id: "",
  }); //Id and name;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        heading={"Advance Payments"}
        description={"Salary advances issued and repayment tracking"}
      />

      <div>
        <AdvanceStats />
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
