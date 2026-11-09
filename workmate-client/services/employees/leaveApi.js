import { apiClient } from "@/lib/apiClient";

// apply for leave
export const applyLeave = async (incomingData) => {
  const response = await apiClient("/workmate/employee/apply-leave", {
    method: "POST",
    body: JSON.stringify(incomingData),
  });
  console.log("response", response);

  return response;
};

// get all applied leave history
export const fetchLeaveHistory = async () => {
  const response = await apiClient("/workmate/employee/leave-history", {
    method: "GET",
  });

  return response;
};

// withdraw leave
export const withdrawLeave = async (leaveId) => {
  const response = await apiClient(
    `/workmate/employee/withdraw-leave/${leaveId}`,
    {
      method: "DELETE",
    },
  );
  console.log("respnse res res", response);

  return response;
};
