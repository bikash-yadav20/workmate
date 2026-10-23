import { apiClient } from "@/lib/apiClient";

export const fetchAdvaceHistory = async (salaryPeriod) => {
  const response = await apiClient(
    `/workmate/admin/advance-history?salaryPeriod=${salaryPeriod}`,
    {
      method: "GET",
    },
  );

  return response;
};
