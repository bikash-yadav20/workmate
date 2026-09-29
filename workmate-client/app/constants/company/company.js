import companyLogo from "@/public/company-logo/workmate-logo.png";
import { FiClock, FiDollarSign, FiCalendar, FiBarChart2 } from "react-icons/fi";

export const company = {
  companyLogo: {
    logo: companyLogo,
    description: "workmate logo",
  },
  companyName: {
    name: "Workmate",
    description: "Name of the company",
  },
};

export const features = [
  {
    icon: FiClock,
    text: "Real-time attendance tracking with geolocation",
  },
  {
    icon: FiDollarSign,
    text: "Automated payroll with advance deductions",
  },
  {
    icon: FiCalendar,
    text: "Smart leave management and approvals",
  },
  {
    icon: FiBarChart2,
    text: "Detailed reports and salary slip generation",
  },
];
