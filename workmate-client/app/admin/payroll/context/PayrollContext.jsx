import { createContext, useContext, useState, useEffect } from "react";
import { employeesCount as fetchEmployeesCount } from "@/services/admin/employees/employeeCountApi";
import { fetchEmployeePayroll } from "@/services/admin/payroll/employeePayrollApi";
import { toast } from "react-toastify";

const PayrollContext = createContext();

export default function PayrollContextProvider({ children }) {
  const [employees, setEmployees] = useState({
    allEmployees: [],
  });

  const [payrollSlipData, setPayrollSlipData] = useState({});

  // fetch all employees and set all employees in state
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetchEmployeesCount();

        const employeesList = response.responseData.employees;

        setEmployees({
          allEmployees: employeesList,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEmployees();
  }, []);

  // get employee payroll slip
  const payrollSlipHandler = async (employeeData) => {
    try {
      const response = await fetchEmployeePayroll(employeeData);

      setPayrollSlipData(response);
    } catch (error) {
      console.error(error.message);
      toast.error("something went wrong");
    }
  };

  return (
    <PayrollContext.Provider
      value={{ employees, payrollSlipHandler, payrollSlipData }}
    >
      {children}
    </PayrollContext.Provider>
  );
}

// make easy to import and use context
export const usePayrollContext = () => {
  const context = useContext(PayrollContext);
  if (!context) {
    throw new Error(
      "usePayrollContext must be used within a PayrollContextProvider",
    );
  }
  return context;
};
