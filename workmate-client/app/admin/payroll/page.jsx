"use client";
import Navbar from "@/app/components/Navbar";
import PayrollStats from "./components/PayrollStats";

export default function page() {
  return (
    <div>
      <Navbar
        heading={"Payroll & Salary Periods"}
        description={"Manage pay cycles and generate payroll reports"}
      />
      <div>
        <PayrollStats />
      </div>
    </div>
  );
}
