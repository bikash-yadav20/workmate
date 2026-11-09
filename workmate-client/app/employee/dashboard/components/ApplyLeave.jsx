import { useState } from "react";
import { Calendar, Send } from "lucide-react";
import { applyLeave } from "@/services/employees/leaveApi";
import { toast } from "react-toastify";

export default function ApplyLeave() {
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleCheckboxChange = (leaveType) => {
    setType((prev) => (prev === leaveType ? "" : leaveType));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await applyLeave({ reason, type, fromDate, toDate });

      console.log("response", response);

      if (response && response.success) {
        toast.success(response.message || "Leave applied successfully!");
        setType("");
        setFromDate("");
        setReason("");
        setToDate("");
      } else {
        toast.error(response?.message || "Failed to apply leave");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white w-full rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        {/* Header */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Apply for Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Leave Type Select */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Leave Type
            </label>

            <div className="flex items-center gap-6">
              {/* Paid Option */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="type"
                  required
                  checked={type === "paid"}
                  onChange={() => handleCheckboxChange("paid")}
                  className="sr-only peer"
                />

                <div
                  className="
        w-5 h-5 rounded-full border-2 border-gray-300
        bg-white flex items-center justify-center
        transition-all
        peer-checked:border-blue-600
        after:content-['']
        after:w-2.5 after:h-2.5
        after:rounded-full after:bg-blue-600
        after:scale-0
        peer-checked:after:scale-100
        after:transition-transform
      "
                />

                <span className="text-gray-700 font-medium capitalize">
                  Paid
                </span>
              </label>

              {/* Unpaid Option */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="type"
                  required
                  checked={type === "unpaid"}
                  onChange={() => handleCheckboxChange("unpaid")}
                  className="sr-only peer"
                />

                <div
                  className="
        w-5 h-5 rounded-full border-2 border-gray-300
        bg-white flex items-center justify-center
        transition-all
        peer-checked:border-blue-600
        after:content-['']
        after:w-2.5 after:h-2.5
        after:rounded-full after:bg-blue-600
        after:scale-0
        peer-checked:after:scale-100
        after:transition-transform
      "
                />

                <span className="text-gray-700 font-medium capitalize">
                  Unpaid
                </span>
              </label>
            </div>
          </div>
          {/* Date Pickers Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Reason Textarea */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Reason
            </label>
            <textarea
              rows="3"
              value={reason}
              required
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe the reason for your leave..."
              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
            />
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/25 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          <Calendar className="w-4 h-4" />
          <span>Submit Leave Request</span>
        </button>
      </div>
    </div>
  );
}
