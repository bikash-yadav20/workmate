import Image from "next/image";
import { useState } from "react";

export default function EmployeesList({ employees, setActiveEmployeeForm }) {
  const allEmployees = employees?.allEmployees || [];

  const [status, setStatus] = useState("all employees");
  const [department, setDepartment] = useState("all department");
  const [role, setRole] = useState("all roles");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = allEmployees.filter((user) => {
    // 1. Check if status matches
    const matchesStatus =
      !status ||
      status.toLowerCase() === "all employees" ||
      (user?.status || "").toLowerCase().includes(status.toLowerCase());

    // 2. Check if department matches
    const matchesDepartment =
      !department ||
      department.toLowerCase() === "all department" ||
      (user?.department || "").toLowerCase().includes(department.toLowerCase());

    // 3. Check if role matches
    const matchesRole =
      !role ||
      role.toLowerCase() === "all roles" ||
      (user?.role || "").toLowerCase().includes(role.toLowerCase());

    // 4. Check if search term matches either full name or email
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      !search ||
      (user?.fullName || "").toLowerCase().includes(search) ||
      (user?.email || "").toLowerCase().includes(search);

    return matchesStatus && matchesDepartment && matchesRole && matchesSearch;
  });

  // Filter unique departments, roles, and status
  const uniqueDepartments = [
    ...new Set(allEmployees.map((emp) => emp.department).filter(Boolean)),
  ];

  const uniqueRoles = [
    ...new Set(allEmployees.map((emp) => emp.role).filter(Boolean)),
  ];

  const uniqueStatus = [
    ...new Set(allEmployees.map((emp) => emp.status).filter(Boolean)),
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 p-4 sm:p-6 bg-white border-b border-gray-100">
        <div className="w-full lg:w-72">
          <input
            className="w-full border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg h-10 px-3 text-sm text-gray-800 placeholder-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search by name or email..."
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            className="border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg h-10 px-3 text-sm text-gray-700 bg-white"
            onChange={(e) => setDepartment(e.target.value)}
            value={department}
            name="Department"
            id="department"
          >
            <option value="all department">All Departments</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg h-10 px-3 text-sm text-gray-700 bg-white"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            name="Role"
            id="role"
          >
            <option value="all roles">All Roles</option>
            {uniqueRoles.map((r) => (
              <option value={r} key={r}>
                {r}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg h-10 px-3 text-sm text-gray-700 bg-white"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            name="Status"
            id="status"
          >
            <option value="all employees">All Statuses</option>
            {uniqueStatus.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
          {/* button to create employee */}
          <button
            onClick={() => setActiveEmployeeForm(true)}
            className="rounded text-white  bg-emerald-400 hover:bg-emerald-500 cursor-pointer"
          >
            Create Employee
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 ? (
        <div className="p-12 text-center text-gray-400 text-sm">
          No employees found matching your criteria.
        </div>
      ) : (
        <>
          {/* DESKTOP & TABLET VIEW (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                  <th className="py-4 px-6">Employee</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Base Salary</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Joined</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredData.map((employee, index) => (
                  <tr
                    key={employee?.id || employee?._id || index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Employee Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={employee?.avatar || "/avatar.png"}
                            alt={employee?.fullName || "Employee avatar"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {employee?.fullName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {employee?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-6 text-gray-600">
                      {employee?.department || "N/A"}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6 text-gray-600">
                      {employee?.role || "N/A"}
                    </td>

                    {/* Base Salary */}
                    <td className="py-4 px-6 font-medium text-gray-800">
                      ₹{employee?.salary?.basicSalary ?? "0"}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full inline-block ${
                          employee?.status === "Active" ||
                          employee?.status === "Present"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {employee?.status || "Active"}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="py-4 px-6 text-gray-600">
                      {employee?.joined ||
                        employee?.createdAt?.slice(0, 10) ||
                        "N/A"}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button className="px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                        Increase Salary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW (Stacked Cards) */}
          <div className="block md:hidden divide-y divide-gray-100">
            {filteredData.map((employee, index) => (
              <div
                key={employee?.id || employee?._id || index}
                className="p-4 space-y-4 hover:bg-gray-50/50 transition-colors"
              >
                {/* Top Row: Avatar, Name, Email, Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={employee?.avatar || "/avatar.png"}
                        alt={employee?.fullName || "Employee avatar"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-base">
                        {employee?.fullName}
                      </p>
                      <p className="text-xs text-gray-400 break-all">
                        {employee?.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                      employee?.status === "Active" ||
                      employee?.status === "Present"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {employee?.status || "Active"}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="text-gray-400 block">Department</span>
                    <span className="font-medium text-gray-700">
                      {employee?.department || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Role</span>
                    <span className="font-medium text-gray-700">
                      {employee?.role || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Base Salary</span>
                    <span className="font-medium text-gray-800">
                      ₹{employee?.salary?.basicSalary ?? "0"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Joined</span>
                    <span className="font-medium text-gray-700">
                      {employee?.joined ||
                        employee?.createdAt?.slice(0, 10) ||
                        "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-1">
                  <button className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors text-center">
                    Increase Salary
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
