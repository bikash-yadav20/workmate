import { apiClient } from "@/lib/apiClient";

export const applyLeave = async (incomingData) => {
  const response = await apiClient("/workmate/employee/apply-leave", {
    method: "POST",
    body: JSON.stringify(incomingData),
  });
  console.log("response", response);

  return response;
};
