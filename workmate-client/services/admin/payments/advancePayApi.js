import { apiClient } from "@/lib/apiClient";

export const payAdvance = async (advancePayData) => {
  const response = await apiClient("/workmate/admin/advance-payment", {
    method: "POST",
    body: JSON.stringify(advancePayData),
  });

  return response;
};
