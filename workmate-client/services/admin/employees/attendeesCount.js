import { apiClient } from "@/lib/apiClient";

export const attendeesCount = async (req, res) => {
  const responseData = await apiClient("/workmate/admin/attendeesCount", {
    method: "GET",
  });
  return responseData;
};
