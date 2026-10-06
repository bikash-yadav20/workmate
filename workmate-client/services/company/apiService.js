import { apiClient } from "@/lib/apiClient";

export async function registerCompany(incommingData) {
  const responseData = await apiClient("/company/create-company", {
    method: "POST",
    body: JSON.stringify(incommingData),
  });
  return responseData;
}
