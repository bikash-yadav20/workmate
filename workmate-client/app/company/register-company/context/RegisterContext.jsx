"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { registerCompany } from "@/services/company/apiService";

const RegisterContext = createContext();

export default function RegisterProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Company and admin data for api
  const [formData, setFormData] = useState({
    //company data
    companyData: {
      companyName: "",
      companyLogo: "",
      companyEmail: "",
      password: "",
      companyAddress: "",
      salaryPeriodStartDate: 1,
    },

    //admin data
    adminData: {
      employeeId: "",
      fullName: "",
      profilePicture: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      department: "",

      // employee salary details
      salary: {
        basicSalary: "",
        providendFund: "",
        allowance: "",
      },

      // employee address
      address: {
        accountNumber: "",
        ifscCode: "",
        street: "",
        city: "",
        state: "",
        country: "",
      },
    },
  });

  //Top level field updater (CompanyData/AdminData)
  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  //deeply nested fields updated admin data
  const handleAdminAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      adminData: {
        ...prev.adminData,
        address: {
          ...prev.adminData.address,
          [field]: value,
        },
      },
    }));
  };

  //deeply nested fields updated admin salary data

  const handleAdminSalaryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      adminData: {
        ...prev.adminData,
        salary: {
          ...prev.adminData.salary,
          [field]: value,
        },
      },
    }));
  };

  //send data to api
  const handleSubmit = async () => {
    try {
      const responseData = await registerCompany(formData);
      return responseData;
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      };
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        handleNestedChange,
        handleAdminAddressChange,
        handleAdminSalaryChange,
        handleSubmit,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

// custom hook for easy access
export const useRegisterForm = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegisterForm must be used within a RegisterProvider");
  }
  return context;
};
