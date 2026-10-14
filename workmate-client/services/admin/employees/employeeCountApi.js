import { apiClient } from "@/lib/apiClient";

export const employeesCount = async () => {
  const responseData = await apiClient("/workmate/employees", {
    method: "GET",
  });

  //get active employees
  const activeEmployees = responseData.employees.filter(
    (e) => e.status === "active",
  );

  //get exited employees
  const exitedEmployees = responseData.employees.filter(
    (e) => e.status === "exited",
  );

  return {
    responseData,
    totalEmployeesCount: activeEmployees.length + exitedEmployees.length,
    activeEmployeesCount: activeEmployees.length,
    exitedEmployeesCount: exitedEmployees.length,
  };
};
