import DashboardContextProvider from "../dashboard/context/DashboardContext";
import EmployeeContextProvider from "../employees/context/EmployeesContext";

export default function Provider({ children }) {
  return (
    <DashboardContextProvider>
      <EmployeeContextProvider>{children}</EmployeeContextProvider>
    </DashboardContextProvider>
  );
}
