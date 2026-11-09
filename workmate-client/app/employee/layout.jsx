"use client";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {children}
    </div>
  );
}
