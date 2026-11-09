import { createContext, useContext, useState, useEffect } from "react";
import { fetchEmployeePayroll } from "@/services/employees/payroll/employeePayrollApi";
import { toast } from "react-toastify";
import { fetchLeaveHistory } from "@/services/employees/leaveApi";

const EmployeeContext = createContext();

export default function EmployeeContextProvider({ children }) {
  const [payrollSlipData, setPayrollSlipData] = useState({});
  const [leaveHistory, setLeaveHistory] = useState([]);

  // get employee payroll slip
  const payrollSlipHandler = async (salaryPeriodId) => {
    try {
      const response = await fetchEmployeePayroll(salaryPeriodId);

      setPayrollSlipData(response);
    } catch (error) {
      console.error(error.message);
      toast.error("something went wrong");
    }
  };

  // get all applied leave history
  useEffect(() => {
    const getAppliedLeaves = async () => {
      try {
        const response = await fetchLeaveHistory();
        if (response.success) {
          setLeaveHistory(response.leaves);
        } else {
          toast.error("Something went wrong! Failed to fetch leave history");
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    };
    getAppliedLeaves();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        payrollSlipHandler,
        payrollSlipData,
        leaveHistory,
        setLeaveHistory,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// make easy to import and use context
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "usePayrollContext must be used within a PayrollContextProvider",
    );
  }
  return context;
};
