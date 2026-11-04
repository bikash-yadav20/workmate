import { useEffect, useState } from "react";
import { Play, Square } from "lucide-react";
import {
  getTodayAttendance,
  markAttendance,
} from "@/services/employees/AttendanceApi";
import { toast } from "react-toastify";

export default function MarkAttendance({ setIsPresent }) {
  const [dateTimeNow, setDateTimeNow] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);

  useEffect(() => {
    setDateTimeNow(new Date());
    const interval = setInterval(() => {
      setDateTimeNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await getTodayAttendance();
        if (!res || !res.attendance) return;

        const record = res.attendance;

        if (record.clockIn && !record.clockOut) {
          setIsClockedIn(true);
          setIsPresent(true);
          setIsClockedOut(false);
        } else if (record.clockIn && record.clockOut) {
          setIsClockedIn(true);
          setIsPresent(true);
          setIsClockedOut(true);
        } else {
          setIsClockedIn(false);
          setIsClockedOut(false);
        }
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  const handleClockInClockOut = async () => {
    try {
      const status = isClockedIn && !isClockedOut ? "clock-out" : "clock-in";
      const response = await markAttendance(status);

      if (response.success) {
        if (status === "clock-in") {
          setIsClockedIn(true);
          setIsPresent(true);
          setIsClockedOut(false);
          toast.success("Successfully clocked in!");
        } else {
          setIsClockedIn(true);
          setIsClockedOut(true);
          toast.success("Successfully clocked out!");
        }
      } else {
        toast.error(response.message || "Action failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (!dateTimeNow) return null;

  const formattedTime = dateTimeNow.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = dateTimeNow.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const showClockOutButton = isClockedIn && !isClockedOut;

  return (
    <div className="bg-white w-full rounded-2xl p-6 flex flex-col items-center justify-between shadow-sm border border-gray-100">
      <div className="text-center mt-2">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
          {formattedTime}
        </p>
        <p className="text-gray-500 text-sm font-medium">{formattedDate}</p>
      </div>

      <div className="my-6">
        {showClockOutButton ? (
          <button
            onClick={handleClockInClockOut}
            className="group relative flex flex-col items-center justify-center w-44 h-44 bg-red-500 hover:bg-red-600 transition-all rounded-full text-white shadow-lg shadow-red-500/25 focus:outline-none focus:ring-4 focus:ring-red-100"
          >
            <Square className="w-7 h-7 mb-1 fill-current" />
            <span className="text-base font-bold">Clock Out</span>
            <span className="text-xs text-red-100 mt-0.5">0.0h today</span>
          </button>
        ) : isClockedIn && isClockedOut ? (
          <div className="flex flex-col items-center justify-center w-44 h-44 bg-gray-100 rounded-full text-gray-500 shadow-inner">
            <span className="text-base font-bold">Completed</span>
            <span className="text-xs text-gray-400 mt-0.5">Shift Ended</span>
          </div>
        ) : (
          <button
            onClick={handleClockInClockOut}
            className="group relative flex flex-col items-center justify-center w-44 h-44 bg-emerald-500 hover:bg-emerald-600 transition-all rounded-full text-white shadow-lg shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            <Play className="w-7 h-7 mb-1 fill-current" />
            <span className="text-base font-bold">Clock In</span>
          </button>
        )}
      </div>
    </div>
  );
}
