import { apiClient } from "@/lib/apiClient";

export const dailyAttendanceLogs = async () => {
  const logs = await apiClient("/workmate/admin/attendance-logs", {
    method: "GET",
  });
  return logs;
};
