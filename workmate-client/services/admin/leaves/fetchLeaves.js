import { apiClient } from "@/lib/apiClient";

export const fetchLeaves = async () => {
  const getleaves = await apiClient("/workmate/admin/leaves", {
    method: "GET",
  });

  const leavesCount = getleaves.leaves.filter(
    (leave) => leave.status === "pending",
  );

  return {
    leaves: getleaves.leaves,
    pendingLeavesCount: leavesCount.length,
  };
};
