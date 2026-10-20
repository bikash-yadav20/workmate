"use client";
import DailyAttendance from "../dashboard/components/DailyAttendance";
import StatCard from "./components/StatCard";
import { useDashboardContext } from "../dashboard/context/DashboardContext";
import Navbar from "@/app/components/Navbar";

export default function page() {
  const { attendanceData } = useDashboardContext();

  const totalPresent = attendanceData.filter(
    (e) => e.status?.toLowerCase() === "present",
  );

  const totalLate = attendanceData.filter(
    (e) => e.status?.toLowerCase() === "present",
  );

  const totalAbsent = attendanceData.filter(
    (e) => e.status?.toLowerCase() === "absent",
  );

  const totalLeave = attendanceData.filter(
    (e) => e.status?.toLowerCase() === "leave",
  );

  // method to calculate percentage
  const calculatePercentage = {
    calculate: function (totalData, actualTotal) {
      const percentage = (totalData / actualTotal) * 100;
      return percentage;
    },
  };

  return (
    <div>
      <div>
        <Navbar
          heading={"Live Attendance Monitor"}
          description={"Real-time employee attendance for today"}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center mt-4">
        {/* stat card for present */}
        <StatCard
          title={"Present"}
          value={totalPresent.length}
          colorTheme={"green"}
          progressPercentage={calculatePercentage.calculate(
            totalPresent.length,
            attendanceData.length,
          )}
        />
        {/* stat card for late*/}
        <StatCard
          title={"Late"}
          value={totalLate.length}
          colorTheme={"amber"}
          progressPercentage={calculatePercentage.calculate(
            totalLate.length,
            attendanceData.length,
          )}
        />
        {/* stat card for absent */}
        <StatCard
          title={"Absent"}
          value={totalAbsent.length}
          colorTheme={"red"}
          progressPercentage={calculatePercentage.calculate(
            totalAbsent.length,
            attendanceData.length,
          )}
        />
        {/* stat card for leaves */}
        <StatCard
          title={"Leave"}
          value={totalLeave.length}
          colorTheme={"purple"}
          progressPercentage={calculatePercentage.calculate(
            totalLeave.length,
            attendanceData.length,
          )}
        />
      </div>
      <div className="mt-4">
        <DailyAttendance />
      </div>
    </div>
  );
}
