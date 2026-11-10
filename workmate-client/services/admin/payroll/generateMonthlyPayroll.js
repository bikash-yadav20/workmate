import { apiClient } from "@/lib/apiClient";

export const monthlySalaryReport = async (salaryPeriodId) => {
  const response = await apiClient(
    "/workmate/admin/generate-monthly-salary-report",
    {
      method: "POST",
      body: JSON.stringify(salaryPeriodId),
    },
  );

  return response;
};
