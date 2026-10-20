import { useEffect, useState } from "react";
import { payAdvance } from "@/services/admin/payments/advancePayApi";
import { toast } from "react-toastify";
import { dateFormatter } from "@/app/utils/date";

export default function PayAdvanceModal({
  setActiveAdvanceModal,
  selectedEmployee,
}) {
  const currentDate = dateFormatter.isoFormatPattern(new Date());

  const [formData, setFormData] = useState({
    employeeId: selectedEmployee?.id,
    amount: "",
    reason: "",
    paymentDate: currentDate,
  });

  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);

  const paymentHandler = async (advancePayData) => {
    try {
      const response = await payAdvance({
        ...advancePayData,
        amount: Number(advancePayData.amount),
      });
      console.log(response);
      if (response.success) {
        toast.success("Advance Payment Success");
        setActiveAdvanceModal(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/50 backdrop-blur-md shadow-lg">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Advance payment to {selectedEmployee?.fullName}
            </h2>
            <p className="text-sm text-gray-500">
              Issue immediate advance against future salary
            </p>
          </div>
          <button
            onClick={() => setActiveAdvanceModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              paymentHandler(formData);
            }}
            className="flex flex-col justify-center gap-6"
            action="submit"
          >
            <input
              className="border-2 rounded min-h-10 p-2 outline-none border-emerald-500 focus:border-emerald-700 transition-colors duration-300 "
              type="number"
              placeholder="enter amout"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
              required
            />
            <input
              className="border-2 rounded min-h-10 p-2 outline-none border-emerald-500 focus:border-emerald-700 transition-colors duration-300 "
              type="text"
              placeholder="reason (optional)"
              value={formData.reason}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reason: e.target.value,
                })
              }
            />
            <input
              className="border-2 rounded min-h-10 p-2 outline-none border-emerald-500 focus:border-emerald-700 transition-colors duration-300 "
              type="date"
              required
              value={formData.paymentDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentDate: e.target.value,
                })
              }
            />
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 rounded p-2 text-white font-bold text-lg cursor-pointer">
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
