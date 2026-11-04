import { apiClient } from "@/lib/apiClient";

// get today attendance
export const getTodayAttendance = async () => {
  const response = await apiClient(
    "/workmate/employee/attendance/today-attendance",
    {
      method: "GET",
    },
  );

  return response;
};

// mark attendance
export const markAttendance = async (status) => {
  let m;
  if (status === "clock-in") {
    m = "POST";
  } else {
    m = "PUT";
  }
  const response = await apiClient(`/workmate/employee/attendance/${status}`, {
    method: m,
  });

  return response;
};
