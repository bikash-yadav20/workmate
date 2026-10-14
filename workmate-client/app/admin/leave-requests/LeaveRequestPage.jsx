"use client";
import Navbar from "@/app/components/Navbar";
import LeaveCards from "./components/LeaveCards";

export default function LeaveRequestPage() {
  return (
    <div>
      <Navbar
        heading={"Leave Requests"}
        description={"Manage employee leave applications"}
        S
      />

      <div>
        <LeaveCards />
      </div>
    </div>
  );
}
