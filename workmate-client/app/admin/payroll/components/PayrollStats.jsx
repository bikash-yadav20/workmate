import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSalaryPeriodContext } from "@/app/context/salaryPeriod/SalaryPeriodContext";
import { dateFormatter } from "@/app/utils/date";
import { monthlySalaryReport } from "@/services/admin/payroll/generateMonthlyPayroll";
import { createSalaryPeriodApi } from "@/services/admin/payroll/createSalaryPeriod";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";

export default function PayrollStats() {
  const [activePeriod, setActivePeriod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { salaryPeriods } = useSalaryPeriodContext();

  useEffect(() => {
    const draftPeriod = salaryPeriods?.find(
      (period) => period.status === "draft",
    );
    setActivePeriod(draftPeriod || null);
  }, [salaryPeriods]);

  const onConfirm = async () => {
    if (!activePeriod?.id) return;
    try {
      const response = await monthlySalaryReport({
        salaryPeriodId: activePeriod.id,
      });

      if (response.success) {
        toast.success(
          "Monthly report generated successfully, and period closed",
        );
        setIsModalOpen(false);
      } else {
        toast.error("Failed to generate salary report");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // create salary period
  const createSalaryPeriod = async () => {
    try {
      const res = await createSalaryPeriodApi();
      console.log("response", res);
      if (res.success) {
        toast.success("Salary period created successfully");
      } else {
        toast.error("Failed to create salary period");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  if (!activePeriod) {
    return (
      <div className="bg-slate-900 border border-slate-900 rounded-xl px-6 py-4 flex items-center justify-between">
        <div className="text-white flex flex-col gap-1">
          <p className="text-slate-400 text-sm">Current Active Period</p>
          <p className="text-xl font-bold text-slate-300">
            No active period found
          </p>
        </div>
        <button
          onClick={() => createSalaryPeriod()}
          className="flex gap-2 text-white items-center font-medium bg-emerald-400 hover:bg-emerald-500 rounded px-4 py-2 cursor-pointer"
        >
          <BarChart3 width={25} /> Create Salary Period
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const daysElapsed = dateFormatter.getDifferenceInDate(
    activePeriod.startDate,
    today,
  );
  const totalDays = dateFormatter.getDifferenceInDate(
    activePeriod.startDate,
    activePeriod.endDate,
  );
  const remainingDays = totalDays - daysElapsed;

  return (
    <div className="bg-slate-900 border border-slate-900 rounded-xl px-6 py-4 flex items-center justify-between">
      <div className="text-white flex flex-col gap-2">
        <p className="text-slate-400 text-sm">Current Active Period</p>
        <p className="text-2xl font-bold">
          {dateFormatter.getMonthName(activePeriod.month, activePeriod.year)}
        </p>
        <p className="text-slate-400 text-sm">
          {dateFormatter.formatDate(activePeriod.startDate)} -{" "}
          {dateFormatter.formatDate(activePeriod.endDate)} {daysElapsed} days
          elapsed {remainingDays} remaining
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex gap-2 text-white items-center font-medium bg-emerald-400 hover:bg-emerald-500 rounded px-4 py-2 cursor-pointer"
        >
          <BarChart3 width={25} /> Generate Monthly Report
        </button>
      </div>
      <ConfirmationModal
        title={"Generate monthly salary report"}
        message={"This action cannot be undone."}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onConfirm}
      />
    </div>
  );
}
