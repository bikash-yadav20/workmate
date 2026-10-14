import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  Shield,
  Image as ImageIcon,
  CheckCircle,
  Edit3,
  Save,
  X,
} from "lucide-react";

export default function EmployeeDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "nishant1",
    fullName: "John",
    profilePicture:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    email: "john.doe@acme.com",
    phone: "9487516487",
    password: "123456",
    role: "Admin",
    department: "Engineering",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Employee Data:", formData);
    // Add your API update call here
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6">
      {/* Header Banner / Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-white">
        <div className="flex items-center gap-4">
          <img
            src={formData.profilePicture}
            alt={formData.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/20 object-cover shadow-md bg-white"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
            }}
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {formData.fullName}
            </h1>
            <p className="text-blue-100 text-sm flex items-center gap-2 mt-0.5">
              <span>ID: {formData.employeeId}</span>
              <span>•</span>
              <span>{formData.department}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${
              formData.status === "active"
                ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30"
                : "bg-rose-500/20 text-rose-100 border border-rose-400/30"
            }`}
          >
            {formData.status}
          </span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
          >
            {isEditing ? (
              <>
                <X size={16} /> Cancel
              </>
            ) : (
              <>
                <Edit3 size={16} /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-8">
        {!isEditing ? (
          /* View Mode */
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 border-b pb-2">
              Employee Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Full Name</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {formData.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail size={20} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 font-medium">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">
                    {formData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {formData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Role</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {formData.role}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Department
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {formData.department}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Password</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    ••••••••
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form Mode */
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 border-b pb-2">
              Edit Employee Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
