import { FaArrowRight, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useRegisterForm } from "../context/RegisterContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ({ setAdminStepActive, isLoading, setIsLoading }) {
  const {
    setCurrentStep,
    formData,
    handleNestedChange,
    handleAdminAddressChange,
    handleAdminSalaryChange,
    handleSubmit,
  } = useRegisterForm();

  const router = useRouter();
  return (
    <div className="flext flex-col h-full items-center  justify-centerw-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-4 text-center sm:text-left">
        <h1 className="text-xl font-bold text-slate-800">Admin Account</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Create your administrator credentials
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          try {
            const res = await handleSubmit();

            if (res.success) {
              toast.success("Company and admin registered successfully");
              router.push("/auth/login");
            } else {
              toast.error(res?.message || "Internal server or network error");
            }
          } catch (error) {
            toast.error("Internal server or network error");
          } finally {
            setIsLoading(false);
          }
        }}
        className="flex flex-col gap-3"
      >
        {/* Admin employee id and name*/}
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="employeeId"
              className="text-xs font-semibold text-slate-600"
            >
              EmployeeId
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              required
              value={formData.adminData.employeeId}
              onChange={(e) =>
                handleNestedChange("adminData", "employeeId", e.target.value)
              }
              placeholder="EMP12345"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="adminName"
              className="text-xs font-semibold text-slate-600"
            >
              Admin Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.adminData.fullName}
              onChange={(e) =>
                handleNestedChange("adminData", "fullName", e.target.value)
              }
              placeholder="enter admin name"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>
        {/* admin contact details */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-slate-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.adminData.email}
              onChange={(e) =>
                handleNestedChange("adminData", "email", e.target.value)
              }
              placeholder="example@workmate.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-xs font-semibold text-slate-600"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.adminData.phone}
              onChange={(e) =>
                handleNestedChange("adminData", "phone", e.target.value)
              }
              placeholder="123456789"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* password field */}
        <div className="w-full">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-slate-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.adminData.password}
              onChange={(e) =>
                handleNestedChange("adminData", "password", e.target.value)
              }
              placeholder="********"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* role and department */}
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="role"
              className="text-xs font-semibold text-slate-600"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              required
              value={formData.adminData.role}
              onChange={(e) =>
                handleNestedChange("adminData", "role", e.target.value)
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="role"
              className="text-xs font-semibold text-slate-600"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              value={formData.adminData.department}
              onChange={(e) =>
                handleNestedChange("adminData", "department", e.target.value)
              }
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            >
              <option value="HR">HR</option>
              <option value="software developer">Software Developer</option>
              <option value="software engineer">Software Engineer</option>
              <option value="cyber security">Cyber Security</option>
            </select>
          </div>
        </div>

        {/* Salary details */}
        <p className="text-sm mt-2">Salary Details</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-slate-600"
            >
              Basic Salary
            </label>
            <input
              id="basicSalary"
              name="basicSalary"
              type="number"
              min={0}
              required
              value={formData.adminData.salary.basicSalary}
              onChange={(e) =>
                handleAdminSalaryChange("basicSalary", e.target.value)
              }
              placeholder="Enter basic salary"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="providendFund"
              className="text-xs font-semibold text-slate-600"
            >
              Providend Fund
            </label>
            <input
              id="providendFund"
              name="providendFund"
              type="number"
              min={0}
              value={formData.adminData.salary.providendFund}
              onChange={(e) =>
                handleAdminSalaryChange("providendFund", e.target.value)
              }
              placeholder="Enter pf amount"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="allowance"
              className="text-xs font-semibold text-slate-600"
            >
              Allowance
            </label>
            <input
              id="allowance"
              name="allowance"
              type="number"
              min={0}
              value={formData.adminData.salary.allowance}
              onChange={(e) =>
                handleAdminSalaryChange("allowance", e.target.value)
              }
              placeholder="Enter allowance amount"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>
        {/* Admin/Employee address */}
        <p className="text-sm mt-2">Admin address</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="accountNumber"
              className="text-xs font-semibold text-slate-600"
            >
              Account Number
            </label>
            <input
              id="accountNumber"
              name="accountNumber"
              type="numnber"
              required
              value={formData.adminData.address.accountNumber}
              onChange={(e) =>
                handleAdminAddressChange("accountNumber", e.target.value)
              }
              placeholder="account number"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="ifscCode"
              className="text-xs font-semibold text-slate-600"
            >
              IFSC Code
            </label>
            <input
              id="ifscCode"
              name="ifscCode"
              type="text"
              required
              value={formData.adminData.address.ifscCode}
              onChange={(e) =>
                handleAdminAddressChange("ifscCode", e.target.value)
              }
              placeholder="enter ifsc code"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="street"
              className="text-xs font-semibold text-slate-600"
            >
              Street
            </label>
            <input
              id="street"
              name="street"
              type="text"
              required
              value={formData.adminData.address.street}
              onChange={(e) =>
                handleAdminAddressChange("street", e.target.value)
              }
              placeholder="e.g. 123 Main St"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="city"
              className="text-xs font-semibold text-slate-600"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={formData.adminData.address.city}
              onChange={(e) => handleAdminAddressChange("city", e.target.value)}
              placeholder="enter you city"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="state"
              className="text-xs font-semibold text-slate-600"
            >
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              value={formData.adminData.address.state}
              onChange={(e) =>
                handleAdminAddressChange("state", e.target.value)
              }
              placeholder="state"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="country"
              className="text-xs font-semibold text-slate-600"
            >
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              value={formData.adminData.address.country}
              onChange={(e) =>
                handleAdminAddressChange("country", e.target.value)
              }
              placeholder="country"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="mt-1 w-fit py-2.5 px-4  hover:text-gray-900 text-gray-800 font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setAdminStepActive(false);
              setCurrentStep(1);
            }}
          >
            <FaArrowLeft className="text-xs" />
            back
          </button>
          <button
            type="submit"
            className="mt-1 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
          >
            {!isLoading ? <span>Register</span> : ""}
            {!isLoading ? (
              <FaArrowRight className="text-xs" />
            ) : (
              <FaSpinner className="text-lg" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
