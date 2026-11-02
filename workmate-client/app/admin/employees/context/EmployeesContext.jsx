"use client";
import { createEmployeeApi } from "@/services/admin/employees/createEmployeeApi";
import { employeesCount as fetchEmployeesCount } from "@/services/admin/employees/employeeCountApi";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const EmployeeContext = createContext();

export default function EmployeeContextProvider({ children }) {
  const [employeesCount, setEmployeesCount] = useState({
    activeEmployees: 0,
    exitedEmployees: 0,
    totalEmployees: 0,
  });

  const [employees, setEmployees] = useState({
    activeEmployees: [],
    exitedEmployees: [],
    allEmployees: [],
  });

  // fetch all employees and set employee count according to status
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetchEmployeesCount();
        setEmployeesCount({
          activeEmployees: response.activeEmployeesCount,
          exitedEmployees: response.exitedEmployeesCount,
          totalEmployees: response.totalEmployeesCount,
        });

        const employeesList = response.responseData.employees;

        const active = [];
        const exited = [];
        response.responseData.employees.forEach((employee) => {
          if (employee.status === "active") {
            active.push(employee);
          } else if (employee.status === "exited") {
            exited.push(employee);
          } else {
            console.log("status not defined in database,", employee.status);
          }
        });

        setEmployees({
          activeEmployees: active,
          exitedEmployees: exited,
          allEmployees: employeesList,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEmployees();
  }, []);

  // create a new employee
  // in this state we hold all employee details from client
  const [employeeFormData, setEmployeesFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    department: "",
    address: {
      accountNumber: "",
      ifscCode: "",
      street: "",
      city: "",
      state: "",
      country: "",
    },
    salary: {
      basicSalary: "",
      providendFund: "",
      allowance: "",
    },
  });

  // updading employee basic data in state
  const updateBasicData = (key, value) => {
    setEmployeesFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  //update chained address and salary
  const updateChainedData = (section, key, value) => {
    setEmployeesFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // test console
  // useEffect(() => {
  //   console.log("employee form data", employeeFormData);
  // }, [employeeFormData]);

  const createEmployee = async () => {
    try {
      const response = await createEmployeeApi(employeeFormData);
      console.log("response logssssssssssssssssssss", response);

      if (response.success !== false) {
        toast.success("Employee Created Successfully");
        return response;
      } else {
        toast.error(response.message || "Failed to create employee");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employeesCount,
        employees,
        updateBasicData,
        updateChainedData,
        employeeFormData,
        createEmployee,
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
      "dashboard context must be used within a EmployeeContextProvider",
    );
  }
  return context;
};
