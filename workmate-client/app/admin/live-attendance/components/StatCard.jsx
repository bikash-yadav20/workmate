export default function StatCard({
  title,
  value,
  colorTheme,
  progressPercentage,
}) {
  const themeStyles = {
    green: {
      text: "text-emerald-600",
      barFill: "bg-emerald-500",
      barTrack: "bg-emerald-100",
    },
    amber: {
      text: "text-amber-500",
      barFill: "bg-amber-400",
      barTrack: "bg-amber-100",
    },
    red: {
      text: "text-rose-500",
      barFill: "bg-rose-500",
      barTrack: "bg-rose-100",
    },
    purple: {
      text: "text-purple-600",
      barFill: "bg-purple-500",
      barTrack: "bg-purple-100",
    },
  };

  const theme = themeStyles[colorTheme];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border-gray-100 flex flex-col justify-between w-64">
      <div>
        <div className={`text-4xl font-bold ${theme.text}`}>{value}</div>
        <div className={`text-gray-500 text-sm mt-1`}>{title}</div>
      </div>

      {/* Botton section progress bar */}
      <div
        className={`w-full h-1.5 rounded-full mt-6 overflow-hidden ${theme.barTrack}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${theme.barFill}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
