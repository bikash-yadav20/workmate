import { apiClient } from "@/lib/apiClient";

export const createEmployeeApi = async (employeeData) => {
  const response = await apiClient("/workmate/create-employee", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });
  return response;
};
