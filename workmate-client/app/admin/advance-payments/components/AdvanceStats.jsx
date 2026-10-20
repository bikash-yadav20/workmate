import { IndianRupee, Check } from "lucide-react";
export default function AdvanceStats() {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-6">
      <div className="bg-white w-fit min-w-[250px] rounded-2xl p-5 shadow-sm border-gray-100 flex gap-4 items-center">
        <div className="bg-amber-100 p-2 inline-flex justify-center items-center rounded w-10 h-10">
          <IndianRupee width={22} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold">₹6,50,000</p>
          <p className="text-sm font-medium text-slate-500">
            Total issued this month
          </p>
        </div>
      </div>
      <div className="bg-white w-fit min-w-[250px] rounded-2xl p-5 shadow-sm border-gray-100 flex gap-4  items-center">
        <div className="bg-emerald-100 p-2 inline-flex justify-center items-center rounded w-10 h-10">
          <Check width={22} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold">2</p>
          <p className="text-sm font-medium text-slate-500">Paid advances</p>
        </div>
      </div>
    </div>
  );
}
