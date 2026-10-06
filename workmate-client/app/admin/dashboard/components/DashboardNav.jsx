import { userInfoContext } from "@/app/context/userContext/UserContext";
import { Bell } from "lucide-react";

export default function DashboardNav() {
  const { userInfo } = userInfoContext();

  return (
    <header className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 p-4 mb-2">
      {/* Left section: Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Welcome back, {userInfo?.fullName}. Here's what's happening today.
        </p>
      </div>

      {/* Right section: Time, Notification, and User Avatar */}
      <div className="flex items-center gap-4 self-end sm:self-auto">
        {/* Date & Time */}
        <div className="text-right hidden xs:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">
            10:29 AM
          </p>
          <p className="text-xs text-slate-500 leading-tight mt-0.5">
            Tuesday, October 6
          </p>
        </div>

        {/* Action icons / profile */}
        <div className="flex items-center gap-3">
          {/* Notification bell with red badge */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 transition-colors cursor-pointer">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </div>

          {/* User Avatar */}
          <div className="flex items-center justify-center bg-indigo-600 text-white font-medium text-sm rounded-full w-10 h-10 shadow-sm cursor-pointer select-none">
            JC
          </div>
        </div>
      </div>
    </header>
  );
}
