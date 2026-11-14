# Workmate

Workmate is a multi-tenant web application designed for real-time attendance monitoring and payroll management. It allows businesses to register their companies and create administrator accounts to manage employees, track daily attendance, handle leave requests, process payroll, and generate financial reports seamlessly.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js (App Router) and React (JS/JSX)
- **Styling:** Tailwind CSS
- **Icons & UI:** Lucide React, React Toastify for notifications
- **State Management:** React Context API
- **Data Fetching:** Native Fetch API with centralized API helpers

### Backend & Database

- **Runtime & Framework:** Node.js and Express.js (Multi-layer architecture: Routes, Controllers, and Services)
- **Database & ORM:** MySQL and Sequelize ORM
- **Authentication:** JSON Web Tokens (JWT) stored securely in HttpOnly cookies
- **Route Protection:** Next.js middleware for protecting `/admin/:path*` and `/employee/:path*` routes
- **Automation:** Node-cron for automated end-of-period salary generation
- **Documentation & Exports:** Swagger UI, PDF salary slip generation, and Excel report exports

**Swagger API Documentation:**  
`http://localhost:PORT/api-docs/`

---

## ✨ Features

### Admin Features

1. **Employee Management:** Create and manage employee profiles.
2. **Attendance Monitoring:** Monitor daily attendance records in real time.
3. **Leave Management:** Review pending leave requests and approve or reject them.
4. **Advance Payments:** Issue and track salary advances for employees.
5. **Automated & Manual Payroll:** Generate monthly payroll reports manually or automatically through Node-cron background jobs at the end of each salary period.
6. **Salary Period Management:** Create new salary periods with a single click.
7. **Salary Slips:** Download detailed, itemized PDF salary slips for employees.
8. **Excel Exports:** Export comprehensive reports, including attendance logs, leave histories, advance payments, and salary records, into Excel spreadsheets.

### Employee Features

1. **Live Attendance:** Mark attendance through secure clock-in and clock-out actions.
2. **Office Wi-Fi Geofencing:** Restrict attendance marking to employees connected to the authorized office Wi-Fi network or IP subnet.
3. **Leave Applications:** Apply for leave directly through the employee portal.
4. **Leave History:** View leave application statuses, withdraw pending requests, and update leave types.
5. **Salary Downloads:** Download PDF salary slips for previously completed salary periods.
6. **Live Salary Tracking:** Track salary deductions, leaves, and advance payments in real time throughout the current salary period.

---

## 🚀 Getting Started & Local Installation

Before starting, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/bikash-yadav20/workmate.git
cd workmate
```

### 2. Backend Setup

Navigate to the backend directory, install the dependencies, configure your environment variables, and start the development server.

```bash
cd workmate-api
npm install
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, install the dependencies, and start the development server.

```bash
cd workmate-client
npm install
npm run dev
```

### 4. Access the Application

Once both servers are running, open your browser and visit the frontend URL (usually `http://localhost:3000`).

To access Swagger API documentation, visit:

`http://localhost:PORT/api-docs/`

---

## 👨‍💻 Author

**Bikash Yadav**
