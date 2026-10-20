import { useState } from "react";
import { X } from "lucide-react";

export default function EmployeesModal({
  employees,
  setSelectedEmployee,
  setActiveEmployeesModal,
  setActiveAdvanceModal,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const activeEmployees = employees?.allEmployees || [];

  const filteredEmployees = activeEmployees.filter(
    (e) =>
      e.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-100">
        {/* Modal Header & Search */}
        <div className="p-6 pb-4 border-b border-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              Select Employee
            </h2>

            <button
              onClick={() => setActiveEmployeesModal(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X width={30} />
            </button>
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search by name or employee ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Employee Table/List Container */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No employees found matching "{searchTerm}"
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold tracking-wider text-slate-400 uppercase border-b border-slate-100">
                  <th className="pb-3 pl-2">Profile</th>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">ID</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEmployees.map((e, index) => (
                  <tr
                    key={e.employeeId || index}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 pl-2">
                      <div className="bg-gradient-to-tr from-violet-600 to-indigo-500 text-white text-xs font-semibold flex items-center justify-center rounded-full w-10 h-10 shadow-sm shadow-violet-500/20">
                        {e.fullName
                          ? e.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()
                          : "JC"}
                      </div>
                    </td>
                    <td className="py-3 font-medium text-slate-800 text-sm">
                      {e.fullName}
                    </td>
                    <td className="py-3 text-slate-500 text-xs font-mono">
                      <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {e.employeeId}
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee({
                            fullName: e.fullName,
                            id: e.id,
                          });
                          setActiveAdvanceModal(true);
                          setActiveEmployeesModal(false);
                        }}
                        className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white text-xs font-semibold rounded-lg shadow-sm shadow-violet-600/20 transition-all active:scale-95"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info  */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {filteredEmployees.length} employees</span>
        </div>
      </div>
    </div>
  );
}
