import { apiClient } from "@/lib/apiClient";

export const fetchEmployeePayroll = async (incomingData) => {
  const { salaryPeriodId, employeeId } = incomingData;

  const params = new URLSearchParams();
  if (salaryPeriodId) params.append("salaryPeriodId", salaryPeriodId);
  if (employeeId) params.append("employeeId", employeeId);

  const queryString = params.toString();

  const url = `/workmate/admin/employee-payroll?${queryString}`;

  const response = await apiClient(url, {
    method: "GET",
  });

  return response;
};
