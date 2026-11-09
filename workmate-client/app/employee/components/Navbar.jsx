"use client";
import Image from "next/image";
import { userInfoContext } from "@/app/context/userContext/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutRoute } from "@/services/auth/apiService";
import { toast } from "react-toastify";

export default function Navbar() {
  const { userInfo } = userInfoContext();

  const router = useRouter();
  return (
    <div>
      <header className="bg-slate-900 w-full px-3 sm:px-6 py-3 border-b border-slate-800">
        <div className="w-full flex items-center justify-between gap-2">
          {/* Left Side: Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/company-logo/workmate-logo.png"
              alt="Workmate Logo"
              width={85}
              height={35}
              className="object-contain"
            />
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-base sm:text-xl">
                WorkMate
              </span>
              <span className="text-slate-400 text-xs sm:text-sm md:inline">
                · {userInfo?.company?.companyName}
              </span>
            </div>
          </div>

          {/* Right Side: User Profile with Hover Dropdown */}
          <div className="relative group cursor-pointer">
            {/* Trigger Area (DP & Name) */}
            <div className="flex items-center gap-2.5 sm:gap-3 py-1">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                <Image
                  src="/avatar.png"
                  alt={userInfo?.fullName || "User Avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-white text-xs sm:text-sm font-semibold leading-tight">
                  {userInfo?.fullName}
                </p>
                <p className="text-slate-400 text-[10px] sm:text-xs">
                  {userInfo?.role}
                </p>
              </div>
            </div>

            {/* Dropdown Menu (Appears on Hover) */}
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/employee/profile"
                className="block px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Profile
              </Link>
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
                className="w-full text-left px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-slate-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-navigation bar */}
      <div className="flex bg-white px-4 sm:px-6 py-2.5 gap-2 sm:gap-3 border-b border-slate-200 shadow-sm items-center">
        <Link
          href="/employee/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Overview
        </Link>
        <Link
          href="/employee/leave-history"
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Leave History
        </Link>
      </div>
    </div>
  );
}
