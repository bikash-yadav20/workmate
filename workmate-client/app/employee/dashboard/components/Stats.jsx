import { dateFormatter } from "@/app/utils/date";

export default function Stats({ isPresent, salaryPeriods }) {
  const activeSalaryPeriod = salaryPeriods?.salaryPeriods?.find(
    (s) => s.status === "draft",
  );
  console.log("activeSalaryPeriod", activeSalaryPeriod);

  // Safely format the month if the object exists, otherwise show a fallback
  const formattedPeriodMonth = activeSalaryPeriod
    ? dateFormatter.getMonthName(
        activeSalaryPeriod.month,
        activeSalaryPeriod.year,
      )
    : "N/A";

  const data = [
    {
      title: "Today's Status",
      state: `${isPresent ? "Present" : "Not Clocked"}`,
      textColor: `${isPresent ? "text-emerald-500" : "text-slate-600"}`,
    },
    {
      title: "Leave Balance",
      state: "12 days",
      textColor: "text-purple-600",
    },
    {
      title: "Month-to-Date Salary",
      state: "$7,600",
      textColor: "text-emerald-600",
    },
    {
      title: "Active Period",
      state: formattedPeriodMonth,
      textColor: "text-slate-800",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {data.map((d, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            {d.title}
          </p>
          <p className={`text-lg sm:text-xl font-bold mt-2 ${d.textColor}`}>
            {d.state}
          </p>
        </div>
      ))}
    </div>
  );
}
