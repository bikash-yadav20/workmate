import Image from "next/image";

export default function PendingLeave() {
  const items = [
    {
      fullName: "Bikash",
      status: "Pending",
      days: "5",
      type: "Paid Leave",
      profilePicture: "/avatar.png",
    },
    {
      fullName: "Manash",
      status: "pending",
      days: "2",
      type: "Unpaid Leave",
      profilePicture: "/avatar.png",
    },
    {
      fullName: "Partha",
      status: "Pending",
      days: "5",
      type: "Paid Leave",
      profilePicture: "/avatar.png",
    },
    {
      fullName: "Raj",
      status: "Pending",
      days: "5",
      type: "Paid Leave",
      profilePicture: "/avatar.png",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-bold text-gray-900">Pending Leave</h1>
        <button className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
          View all
        </button>
      </div>

      {/* List items */}
      <div className="space-y-4">
        {items.slice(-3).map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none"
          >
            {/* Left side: Avatar & Info */}
            <div className="flex items-center space-x-3">
              <Image
                src={item.profilePicture}
                width={40}
                height={40}
                className="rounded-full object-cover"
                alt={item.fullName}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">
                  {item.fullName}
                </span>
                <span className="text-gray-400 text-xs">
                  {item.type} · {item.days}d
                </span>
              </div>
            </div>

            {/* Right side: Status Badge */}
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
