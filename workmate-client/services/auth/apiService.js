import { apiClient } from "@/lib/apiClient";

//fetch selft data from jwt to verify access page
export const authMe = async () => {
  const responseData = await apiClient("/workmate/auth-me", {
    method: "GET",
  });
  return responseData;
};

//login admin or employee
export const loginRoute = async (credentials) => {
  const response = await apiClient("/workmate/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response;
};
