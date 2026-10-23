import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/react-toastify/ToastProvider";

import ContextProvider from "./context/ContextProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>
        <ContextProvider>
          <ToastProvider>{children}</ToastProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
