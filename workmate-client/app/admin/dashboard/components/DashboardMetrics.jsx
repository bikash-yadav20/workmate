import {
  Users,
  UserCheck,
  UserX,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

export default function DashboardMetrics({
  employeesCountStatus,
  totalPresent,
  totalAbsent,
  leavesCount,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      {/* 1. Total Employees */}
      <div className="bg-white p-6  rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {employeesCountStatus?.totalEmployeesCount ?? 0}
          </p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Total Employees
          </p>
        </div>
      </div>

      {/* 2. Active Employees */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {employeesCountStatus?.activeEmployeesCount ?? 0}
          </p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Active Employees
          </p>
        </div>
      </div>

      {/* 3. Exited Employees */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <UserX className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {employeesCountStatus?.exitedEmployeesCount ?? 0}
          </p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Exited Employees
          </p>
        </div>
      </div>

      {/* 4. Today's Present */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{totalPresent}</p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Today's Present
          </p>
        </div>
      </div>

      {/* 5. Today's Absent */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <XCircle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{totalAbsent}</p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Today's Absent
          </p>
        </div>
      </div>

      {/* 6. Pending Leaves */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{leavesCount}</p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">
            Pending Leaves
          </p>
          {leavesCount > 0 && (
            <p className="text-sm text-red-400 font-bold">needs action</p>
          )}
        </div>
      </div>
    </div>
  );
}
