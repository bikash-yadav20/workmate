import { apiClient } from "@/lib/apiClient";

// get all salary periods for a company
export const fetchSalaryPeriods = async () => {
  const salaryPeriods = await apiClient("/workmate/admin/fetch-salaryPeriods", {
    method: "GET",
  });
  return salaryPeriods;
};
