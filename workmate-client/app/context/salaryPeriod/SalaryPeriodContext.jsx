"use client";
import { fetchSalaryPeriods } from "@/services/fetchSalaryPeriodsApi";
import { useState, useContext, createContext, useEffect } from "react";

const SalaryPeriodContext = createContext();

export default function SalaryPeriodContextProvider({ children }) {
  const [salaryPeriods, setSalaryPeriods] = useState({ salaryPeriods: [] });

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await fetchSalaryPeriods();

        if (response.success) {
          setSalaryPeriods({ salaryPeriods: response?.salaryPeriods });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPeriods();
  }, []);

  return (
    <SalaryPeriodContext.Provider value={salaryPeriods}>
      {children}
    </SalaryPeriodContext.Provider>
  );
}

export const useSalaryPeriodContext = () => {
  const context = useContext(SalaryPeriodContext);
  if (!context) {
    throw new Error(
      "authenticateContext must be used within a Salary period provider",
    );
  }
  return context;
};
