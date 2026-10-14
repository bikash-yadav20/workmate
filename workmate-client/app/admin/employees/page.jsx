import EmployeesPage from "./EmployeesPage";
import EmployeeContextProvider from "./context/EmployeesContext";

export default function Page() {
  return (
    <EmployeeContextProvider>
      <div>
        <div>
          <EmployeesPage />
        </div>
      </div>
    </EmployeeContextProvider>
  );
}
