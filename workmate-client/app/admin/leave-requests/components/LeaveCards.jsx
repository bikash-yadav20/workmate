export default function LeaveCards() {
  // dummy data
  [
    {
      name: "Amara Diallo",
      appliedDate: "10/14/2026",
      status: "Pending",
      type: "Annual Leave",
      duration: "5 days",
      from: "Sep 22, 2026",
      to: "Sep 26, 2026",
      reason: "Family vacation planned well in advance.",
    },
    {
      name: "James Okafor",
      appliedDate: "10/14/2026",
      status: "Pending",
      type: "Sick Leave",
      duration: "1 day",
      from: "Sep 24, 2026",
      to: "Sep 24, 2026",
      reason: "Fever and doctor's appointment.",
    },
    {
      name: "Priya Patel",
      appliedDate: "10/14/2026",
      status: "Approved",
      type: "Personal Leave",
      duration: "3 days",
      from: "Oct 1, 2026",
      to: "Oct 3, 2026",
      reason: "Moving to new apartment.",
    },
  ];

  return (
    <div>
      {/* filter tab buttons */}
      <div className="grid grid-cols-2 md:flex gap-3 ">
        <button className="bg-gray-200 p-2 text-xs rounded border border-gray-400 hover:bg-gray-300 cursor-pointer flex items-center gap-1.5">
          All
          <span className="w-4 h-4 inline-flex items-center justify-center bg-gray-400 rounded-full text-white text-[10px] font-medium">
            1
          </span>
        </button>
        <button className="bg-gray-200 p-2 text-xs rounded border border-gray-400 hover:bg-gray-300 cursor-pointer flex items-center gap-1.5">
          Pending{" "}
          <span className="w-4 h-4 inline-flex items-center justify-center bg-gray-400 rounded-full text-white text-[10px] font-medium">
            1
          </span>
        </button>
        <button className="bg-gray-200 p-2 text-xs rounded border border-gray-400 hover:bg-gray-300 cursor-pointer flex items-center gap-1.5">
          Approved{" "}
          <span className="w-4 h-4 inline-flex items-center justify-center bg-gray-400 rounded-full text-white text-[10px] font-medium">
            1
          </span>
        </button>
        <button className="bg-gray-200 p-2 text-xs rounded border border-gray-400 hover:bg-gray-300 cursor-pointer flex items-center gap-1.5">
          Rejected{" "}
          <span className="w-4 h-4 inline-flex items-center justify-center bg-gray-400 rounded-full text-white text-[10px] font-medium">
            1
          </span>
        </button>
      </div>

      {/* leaves cards */}
      <div></div>
    </div>
  );
}
