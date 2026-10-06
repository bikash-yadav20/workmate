import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/react-toastify/ToastProvider";
import AuthContextProvider from "./context/auth/AuthContext";
import UserContextProvider from "./context/userContext/UserContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>
        <AuthContextProvider>
          <UserContextProvider>
            <ToastProvider>{children}</ToastProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
