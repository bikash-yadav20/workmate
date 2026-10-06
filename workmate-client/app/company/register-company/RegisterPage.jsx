"use client";
import RegisterProvider from "./context/RegisterContext";
import { useState } from "react";
import LandingSidePage from "./components/LandingSidePage";
import StepProgress from "./components/StepProgress";
import CompanyStep from "./components/CompanyStep";
import AdminStep from "./components/AdminStep";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminStepActive, setAdminStepActive] = useState(false);

  return (
    <RegisterProvider>
      <div className="flex flex-col md:flex-row min-h-screen  md:h-screen w-full overflow-y-auto md:overflow-hidden">
        {/* Left Sidebar / Hero Area */}
        <LandingSidePage />

        {/* Right Form Area */}
        <div className="flex flex-col w-full h-full md:w-1/2 items-center  p-4 sm:p-8 overflow-y-auto ">
          <div className="w-full max-w-md flex flex-col items-center gap-6 my-auto, py-8">
            <StepProgress />
            {isAdminStepActive ? (
              <AdminStep
                setAdminStepActive={setAdminStepActive}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            ) : (
              <CompanyStep setAdminStepActive={setAdminStepActive} />
            )}
          </div>
        </div>
      </div>
    </RegisterProvider>
  );
}
