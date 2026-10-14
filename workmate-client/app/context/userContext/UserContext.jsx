"use client";
import { selfDataApi } from "@/services/admin/employees/selfDataApi";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSelfAndCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await selfDataApi();

      if (result?.success) {
        setUserInfo(result.employeeData);
        setCompanyInfo(result.companyData);
      }
    } catch (error) {
      console.error("Failed to fetch user and company data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSelfAndCompanyData();
  }, [fetchSelfAndCompanyData]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        companyInfo,
        loading,
        refetch: fetchSelfAndCompanyData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const userInfoContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("user context must be used within a UserContextProvider");
  }
  return context;
};
