"use client";
import Image from "next/image";
import { userInfoContext } from "@/app/context/userContext/UserContext";

export default function Navbar() {
  const { userInfo } = userInfoContext();

  return (
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
          <div className="flex flex-col items-center ">
            <span className="text-white font-bold text-base sm:text-xl">
              WorkMate
            </span>
            <span className="text-slate-400 text-xs sm:text-sm  md:inline">
              · {userInfo?.company?.companyName}
            </span>
          </div>
        </div>

        {/* Right Side: User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
            <Image
              src="/avatar.png"
              alt="Bikash Yadav"
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
      </div>
    </header>
  );
}
