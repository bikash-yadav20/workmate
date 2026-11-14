"use client";

import React, { useState } from "react";
import { userInfoContext } from "@/app/context/userContext/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  CircleDollarSign,
  Briefcase,
  BarChart3,
  UserCheck,
  LogOut,
  Menu,
  X,
  BriefcaseBusiness,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { userInfo, companyInfo } = userInfoContext();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/admin/employees", icon: Users },
    { name: "Live Attendance", href: "/admin/live-attendance", icon: Clock },
    {
      name: "Leave Requests",
      href: "/admin/leave-requests",
      icon: CalendarDays,
      badge: "3",
    },
    {
      name: "Advance Payments",
      href: "/admin/advance-payments",
      icon: CircleDollarSign,
    },
    { name: "Payroll & Periods", href: "/admin/payroll", icon: Briefcase },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header / Hamburger Button (Visible only on mobile) */}
      <div className="md:hidden flex items-center justify-between bg-[#0B132B] text-white px-4 py-3 fixed top-0 left-0 right-0 z-40 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="bg-[#10B981] p-2 rounded-xl text-white">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">AttendPay</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#0B132B] text-gray-300 flex flex-col justify-between p-4
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        transition-transform duration-300 ease-in-out
        border-r border-gray-800/60 min-h-screen
        pt-16 md:pt-4
      `}
      >
        {/* Top Section: Logo & Navigation */}
        <div>
          {/* Logo Brand (Hidden on mobile top since we put it in the sticky header, but visible on desktop) */}
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 mb-6">
            <div className="bg-[#10B981] p-2.5 rounded-xl text-white shadow-md">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight">
                WorkMate
              </h1>
              <p className="text-xs text-gray-400">
                {companyInfo?.companyName} · Admin
              </p>
            </div>
          </div>

          {/* Main Menu Label */}
          <p className="text-xs font-semibold text-gray-500 tracking-wider px-3 mb-3 uppercase">
            Main Menu
          </p>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Close sidebar on click on mobile
                  className={`flex items-center justify-between px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#113035] text-[#10B981] shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-[#10B981]" : "text-gray-400"}`}
                    />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Employee Portal & Sign Out */}
        <div className="space-y-2 pt-6 border-t border-gray-800/80">
          <Link
            href="/employee/portal"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium text-[#10B981] bg-[#113035]/60 hover:bg-[#113035] transition-all"
          >
            <UserCheck className="w-5 h-5" />
            <span>Employee Portal</span>
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              // Handle sign out logic here
            }}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
