// Universal helper: Automatically cleans any Sequelize index/composite path
// without needing model-specific configuration.
const universalFieldFormatter = (rawPath) => {
  if (!rawPath) return "Field";

  // 1. Remove database table name prefix (e.g., "employees_", "products_")
  let cleaned = rawPath.replace(/^[a-z]+_/i, "");

  // 2. Remove the multi-tenant scope prefix (e.g., "company_id_")
  cleaned = cleaned.replace(/company_id_/gi, "");

  // 3. Remove trailing suffixes like "_unique" or index prefixes
  cleaned = cleaned.replace(/_unique$/, "").replace(/^idx_/, "");

  // 4. Format whatever column name is left (e.g., "employee_id" -> "Employee ID")
  return cleaned
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\bId\b/g, "ID")
    .trim();
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 1. Handle Unique Constraints Universally for ALL models
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409; // 409 Conflict

    // Grab the database index path (e.g., "employees_company_id_employee_id")
    const rawPath =
      err.errors?.[0]?.path || (err.fields ? Object.keys(err.fields)[0] : "");
    const formattedField = universalFieldFormatter(rawPath);

    message = `${formattedField} already exists. Please use a different one.`;
  }

  // 2. Handle Sequelize Validation & Database Errors
  else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeDatabaseError"
  ) {
    statusCode = 400;

    if (err.errors && err.errors.length > 0) {
      message = err.errors[0].message;
    } else if (err.message.includes("cannot be null")) {
      message = "A required field is missing.";
    } else {
      message = "Invalid database input provided.";
    }
  }

  // 3. Handle Foreign Key Failures
  else if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
    message = "Related record reference not found.";
  }

  console.error("GLOBAL ERROR CATCHER:", message);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
