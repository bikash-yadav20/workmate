"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { registerCompany } from "@/services/apiService";

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

      // employee address
      address: {
        accountNumber: "",
        ifscCode: "",
        street: "",
        city: "",
        state: "",
        country: "",
      },

      // employee salary details
      basicSalary: "",
      providendFund: "",
      allowance: "",
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

  //send data to api
  const handleSubmit = async () => {
    try {
      const responseData = await registerCompany(formData);
      console.log(responseData);
    } catch (error) {
      console.log(error.message);
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
