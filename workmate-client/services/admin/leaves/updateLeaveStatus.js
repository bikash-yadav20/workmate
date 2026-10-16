import { apiClient } from "@/lib/apiClient";

export const updateLeaveStatus = async (leaveStatusData) => {
  const response = await apiClient("/workmate/admin/leave-status", {
    method: "PUT",
    body: JSON.stringify(leaveStatusData),
  });

  return response;
};
