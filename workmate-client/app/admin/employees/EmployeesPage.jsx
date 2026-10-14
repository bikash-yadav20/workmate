"use client";
import Navbar from "@/app/components/Navbar";
import { useEmployeeContext } from "./context/EmployeesContext";
import EmployeesList from "./components/EmployeesList";
import { useState } from "react";
import EmployeeDetails from "./components/EmployeeDetails";
import SalaryDetails from "./components/SalaryDetails";
import AddressDetails from "./components/AddressDetails";

export default function EmployeesPage() {
  const { employeesCount, employees } = useEmployeeContext();

  const [activeEmployeeForm, setActiveEmployeeForm] = useState(false);
  const [activeAddressForm, setActiveAddressForm] = useState(false);
  const [activeSalaryForm, setActiveSalaryForm] = useState(false);

  const description = `${employeesCount.activeEmployees} total employees across all departments`;

  return (
    <div>
      <Navbar heading={"Employee Management"} description={description} />

      <div>
        <EmployeesList
          employees={employees}
          setActiveEmployeeForm={setActiveEmployeeForm}
        />

        {/* 1. MODAL BACKDROP CONTAINER: This makes it pop up over everything */}
        {(activeEmployeeForm || activeSalaryForm || activeAddressForm) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Employee Form Step */}
              {activeEmployeeForm && !activeSalaryForm && (
                <EmployeeDetails
                  setActiveEmployeeForm={setActiveEmployeeForm}
                  setActiveSalaryForm={setActiveSalaryForm}
                />
              )}

              {/* Salary Form Step  */}
              {activeSalaryForm && !activeAddressForm && (
                <SalaryDetails
                  setActiveSalaryForm={setActiveSalaryForm}
                  setActiveEmployeeForm={setActiveEmployeeForm}
                  setActiveAddressForm={setActiveAddressForm}
                />
              )}

              {/* Address Form Step */}
              {activeAddressForm && !activeSalaryForm && (
                <AddressDetails
                  setActiveEmployeeForm={setActiveEmployeeForm}
                  setActiveSalaryForm={setActiveSalaryForm}
                  setActiveAddressForm={setActiveAddressForm}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
