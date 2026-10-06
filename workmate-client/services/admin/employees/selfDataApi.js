import { apiClient } from "@/lib/apiClient";

export const selfDataApi = async () => {
  try {
    const responseData = await apiClient(
      "/workmate/employee-profile/self-data",
      {
        method: "GET",
      },
    );

    return {
      success: responseData.success,
      employeeData: responseData.data,
      companyData: responseData.data?.company,
    };
  } catch (error) {
    console.error("Error inside selfDataApi:", error);
    return { success: false, employeeData: null, companyData: null };
  }
};
