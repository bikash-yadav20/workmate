const defineAssociations = (models) => {
  const {
    Company,
    Employee,
    EmployeeAddress,
    Salary,
    Attendance,
    DeductionRule,
    EmployeeLeave,
    AdvancePayment,
    SalaryPeriod,
    SalaryRecord,
    Holiday,
  } = models;

  //Company <--> Employee
  Company.hasMany(Employee, {
    foreignKey: "companyId",
    as: "employees",
    onDelete: "CASCADE",
  });
  Employee.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  // Company <---> EmployeeAddress
  Company.hasMany(EmployeeAddress, {
    foreignKey: "companyId",
    as: "addresses",
    onDelete: "CASCADE",
  });
  EmployeeAddress.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  //Employee <--> Employee Address
  Employee.hasOne(EmployeeAddress, {
    foreignKey: "employeeId",
    as: "address",
    onDelete: "CASCADE",
  });
  EmployeeAddress.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Employee <--> Salary
  Employee.hasOne(Salary, {
    foreignKey: "employeeId",
    as: "salary",
    onDelete: "CASCADE",
  });

  Salary.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  // Company <--> Attendance
  Company.hasMany(Attendance, {
    foreignKey: "companyId",
    as: "attendances",
    onDelete: "CASCADE",
  });
  Attendance.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  //Employee <--> Attendance
  Employee.hasMany(Attendance, {
    foreignKey: "employeeId",
    as: "attendances",
    onDelete: "CASCADE",
  });
  Attendance.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Company <--> deduction rules
  Company.hasMany(DeductionRule, {
    foreignKey: "companyId",
    as: "deductionRules",
    onDelete: "CASCADE",
  });
  DeductionRule.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  // Company <--> EmployeeLeave
  Company.hasMany(EmployeeLeave, {
    foreignKey: "companyId",
    as: "leaves",
    onDelete: "CASCADE",
  });

  EmployeeLeave.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  // Employee <-->EmployeeLeave
  Employee.hasMany(EmployeeLeave, {
    foreignKey: "employeeId",
    as: "leaves",
    onDelete: "CASCADE",
  });
  EmployeeLeave.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  // Company <--> AdvancePayment
  Company.hasMany(AdvancePayment, {
    foreignKey: "companyId",
    as: "advancePayments",
    onDelete: "CASCADE",
  });
  AdvancePayment.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  // Employee <--> AdvancePayment
  Employee.hasMany(AdvancePayment, {
    foreignKey: "employeeId",
    as: "advancePayments",
    onDelete: "CASCADE",
  });
  AdvancePayment.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  // Company <--> SalaryPeriod
  Company.hasMany(SalaryPeriod, {
    foreignKey: "companyId",
    as: "salaryPeriods",
    onDelete: "CASCADE",
  });
  SalaryPeriod.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });

  // SalaryPeriod <--> SalaryRecord
  SalaryPeriod.hasMany(SalaryRecord, {
    foreignKey: "salaryPeriodId",
    as: "salaryRecords",
    onDelete: "CASCADE",
  });

  SalaryRecord.belongsTo(SalaryPeriod, {
    foreignKey: "salaryPeriodId",
    as: "salaryPeriod",
  });

  // Company <--SalaryRecord
  Company.hasMany(SalaryRecord, {
    foreignKey: "companyId",
    as: "salaryRecords",
    onDelete: "CASCADE",
  });

  SalaryRecord.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });
  // Employee <--> SalaryRecord
  Employee.hasMany(SalaryRecord, {
    foreignKey: "employeeId",
    as: "salaryRecords",
    onDelete: "CASCADE",
  });
  SalaryRecord.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  // Company <--> Holiday
  Company.hasMany(Holiday, {
    foreignKey: "companyId",
    as: "holidays",
    onDelete: "CASCADE",
  });
  Holiday.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });
};

module.exports = defineAssociations;
