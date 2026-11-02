import { jsPDF } from "jspdf";
import { dateFormatter } from "./date";

// Download slip as PDF
export const downloadSlip = (employeeData, slipData, period) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // 1. HEADER SECTION (Company Info & Title)
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, pageWidth, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(slipData.companyDetails?.companyName || "Company", margin, 16);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Salary Slip for ${dateFormatter.getMonthName(period.month, period.year)}`,
    pageWidth - margin,
    16,
    {
      align: "right",
    },
  );

  // 2. EMPLOYEE & PAY PERIOD INFO BOX
  let currentY = 35;

  doc.setFillColor(249, 250, 251); // Light gray box background
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "FD");

  doc.setTextColor(55, 65, 81);
  doc.setFontSize(9);

  // Left Column (Employee Details)
  doc.setFont("helvetica", "bold");
  doc.text("Employee Name:", margin + 5, currentY + 7);
  doc.setFont("helvetica", "normal");
  doc.text(employeeData.fullName || "null", margin + 35, currentY + 7);

  doc.setFont("helvetica", "bold");
  doc.text("Department:", margin + 5, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.text(employeeData.department || "null", margin + 35, currentY + 15);

  // Right Column (Pay Period & ID)
  doc.setFont("helvetica", "bold");
  doc.text("Employee ID:", margin + 110, currentY + 7);
  doc.setFont("helvetica", "normal");
  doc.text(
    String(employeeData.employeeId || "null"),
    margin + 135,
    currentY + 7,
  );

  doc.setFont("helvetica", "bold");
  doc.text("Pay Period:", margin + 110, currentY + 15);
  doc.setFont("helvetica", "normal");
  doc.text(
    dateFormatter.getMonthName(period.month, period.year),
    margin + 135,
    currentY + 15,
  );

  // 3. EARNINGS & DEDUCTIONS TABLE HEADERS
  currentY += 32;

  doc.setFillColor(243, 244, 246);
  doc.rect(margin, currentY, contentWidth, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(31, 41, 55);
  doc.text("EARNINGS", margin + 5, currentY + 5.5);
  doc.text("AMOUNT (₹)", margin + 85, currentY + 5.5, { align: "right" });

  doc.text("DEDUCTIONS", margin + 105, currentY + 5.5);
  doc.text("AMOUNT (₹)", margin + contentWidth - 5, currentY + 5.5, {
    align: "right",
  });

  // 4. TABLE ROWS (Earnings & Deductions side-by-side)
  currentY += 8;
  const rowHeight = 8;

  const earnings = [
    { label: "Basic Salary", amount: slipData.basicSalary || 0 },
    { label: "Allowance (HRA)", amount: slipData.allowance || 0 },
  ];

  const deductions = [
    { label: "Late Attendance Deduction", amount: slipData.lateDeduction || 0 },
    { label: "Absent Deduction", amount: slipData.absentDeduction || 0 },
    { label: "PF Deduction", amount: slipData.providentFund || 0 },
    { label: "Advance Deduction", amount: slipData.advanceDeduction || 0 },
  ];

  const maxRows = Math.max(earnings.length, deductions.length);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  for (let i = 0; i < maxRows; i++) {
    let rowY = currentY + i * rowHeight;

    // Alternating background tint for rows
    if (i % 2 === 1) {
      doc.setFillColor(252, 253, 254);
      doc.rect(margin, rowY, contentWidth, rowHeight, "F");
    }

    // Earnings Data
    if (earnings[i]) {
      doc.text(earnings[i].label, margin + 5, rowY + 5.5);
      doc.text(
        Number(earnings[i].amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        }),
        margin + 85,
        rowY + 5.5,
        { align: "right" },
      );
    }

    // Deductions Data
    if (deductions[i]) {
      doc.text(deductions[i].label, margin + 105, rowY + 5.5);
      doc.text(
        Number(deductions[i].amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        }),
        margin + contentWidth - 5,
        rowY + 5.5,
        { align: "right" },
      );
    }
  }

  currentY += maxRows * rowHeight + 4;

  // Draw dividing line
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, currentY, margin + contentWidth, currentY);

  // 5. CALCULATE TOTALS DYNAMICALLY
  const totalEarnings = earnings.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );
  const totalDeductions =
    slipData.totalDeduction ??
    deductions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const netSalary =
    slipData.netSalary ?? Math.max(0, totalEarnings - totalDeductions);

  // 6. TOTALS & NET PAYABLE SUMMARY BOX
  currentY += 6;

  doc.setFont("helvetica", "bold");
  doc.text(
    `Total Earnings: ₹${Number(totalEarnings).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    margin + 5,
    currentY,
  );
  doc.text(
    `Total Deductions: ₹${Number(totalDeductions).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    margin + 105,
    currentY,
  );

  currentY += 10;

  // Highlight Net Payable Box
  doc.setFillColor(236, 253, 245); // Light emerald background
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, "FD");

  doc.setFontSize(11);
  doc.setTextColor(6, 95, 70);
  doc.text("NET PAYABLE:", margin + 5, currentY + 9);
  doc.setFontSize(13);
  doc.text(
    `₹${Number(netSalary).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    margin + contentWidth - 5,
    currentY + 9,
    { align: "right" },
  );

  // 7. FOOTER & SIGNATURE
  currentY += 25;
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(
    "This is a system-generated document and does not require a physical signature.",
    pageWidth / 2,
    currentY,
    { align: "center" },
  );

  doc.save(`Salary_Slip_${employeeData.fullName || "Employee"}.pdf`);
};
