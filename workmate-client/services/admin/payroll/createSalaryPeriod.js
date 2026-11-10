import { apiClient } from "@/lib/apiClient";

export const createSalaryPeriodApi = async () => {
  const response = await apiClient("/workmate/admin/salary-period", {
    method: "POST",
  });

  return response;
};
