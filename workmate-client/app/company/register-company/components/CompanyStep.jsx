import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { useRegisterForm } from "../context/RegisterContext";
import { useEffect } from "react";

export default function CompanyStep({
  isLoading,
  setIsLoading,
  setAdminStepActive,
}) {
  const { setCurrentStep, formData, handleNestedChange } = useRegisterForm();

  // handle form submit to show loading icon and mount admin step component
  const handleNextStep = (e) => {
    alert("Button clicked");
    e.preventDefault();
    setCurrentStep(2);
    setAdminStepActive(true);
  };

  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-xl font-bold text-slate-800">Company details</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tell us about your organization
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-3">
        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="companyName"
            className="text-xs font-semibold text-slate-600"
          >
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            value={formData.companyData.companyName}
            onChange={(e) =>
              handleNestedChange("companyData", "companyName", e.target.value)
            }
            placeholder="e.g. Acme Corporation"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="companyEmail"
            className="text-xs font-semibold text-slate-600"
          >
            Email
          </label>
          <input
            id="companyEmail"
            type="email"
            value={formData.companyData.companyEmail}
            onChange={(e) =>
              handleNestedChange("companyData", "companyEmail", e.target.value)
            }
            placeholder="e.g. acme@gmail.com"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-slate-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.companyData.password}
            onChange={(e) =>
              handleNestedChange("companyData", "password", e.target.value)
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        {/* Company Address */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="text-xs font-semibold text-slate-600"
          >
            Company Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="e.g. 123 Main St, New York, NY"
            value={formData.companyData.companyAddress}
            onChange={(e) =>
              handleNestedChange(
                "companyData",
                "companyAddress",
                e.target.value,
              )
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        {/* Salary Period Start Date */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="salaryPeriodStart"
            className="text-xs font-semibold text-slate-600"
          >
            Salary Period Start Date
          </label>
          <input
            id="salaryPeriodStart"
            type="number"
            min="1"
            max="28"
            placeholder="e.g. 1 (between 1-28)"
            value={formData.companyData.salaryPeriodStartDate}
            onChange={(e) =>
              handleNestedChange(
                "companyData",
                "salaryPeriodStartDate",
                e.target.value,
              )
            }
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleNextStep}
          className="mt-1 w-full py-2.5 px-4  bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
        >
          Continue to admin setup
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}
