import { Bell } from "lucide-react";
import { dateFormatter } from "@/app/utils/date";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutRoute } from "@/services/auth/apiService";
import { toast } from "react-toastify";

export default function Navbar({ heading, description }) {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  //the date and time will only be rendered once component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 p-4 mb-2">
      {/* Left section: Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {heading}
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>

      {/* Right section: Time, Notification, and User Avatar */}
      <div className="flex items-center gap-4 self-end sm:self-auto">
        {/* Date & Time */}
        <div className="text-right  xs:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">
            {mounted ? dateFormatter.currentTime() : "Loading..."}
          </p>
          <p className="text-xs text-slate-500 leading-tight mt-0.5">
            {mounted ? dateFormatter.currentDateLong() : "Loading..."}
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
          <div className="flex flex-col  group ">
            <div className="flex items-center justify-center bg-indigo-600 text-white font-medium text-sm rounded-full w-10 h-10 shadow-sm cursor-pointer select-none">
              JC
            </div>
            <div className="opacity-0 transition-opacity-300  group-hover:opacity-100 flex flex-col gap-3 absolute mt-12 bg-white border-gray-100 ">
              <p className="text-sm font-medium cursor-pointer">profile</p>
              <button
                onClick={async () => {
                  const res = await logoutRoute();
                  if (res.success) {
                    toast.success("Logout successful");
                    router.push("/auth/login");
                    router.refresh();
                  } else {
                    toast.error(res.message || "Logout failed");
                  }
                }}
                className="text-sm font-medium text-red-500 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
