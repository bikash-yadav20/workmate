import { apiClient } from "@/lib/apiClient";

export const fetchEmployeePayroll = async (salaryPeriodId) => {
  const params = new URLSearchParams();
  if (salaryPeriodId) params.append("salaryPeriodId", salaryPeriodId);

  const queryString = params.toString();

  const url = `/workmate/employee/salary-slip?${queryString}`;

  const response = await apiClient(url, {
    method: "GET",
  });

  return response;
};
