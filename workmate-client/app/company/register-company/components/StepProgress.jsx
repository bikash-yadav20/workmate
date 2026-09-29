import { useRegisterForm } from "../context/RegisterContext";

export default function StepProgress({ totalSteps = 2 }) {
  const { currentStep } = useRegisterForm();
  return (
    <div className="w-full space-y-2 mb-2">
      {/* Horizontal step bar */}
      <div className="flex h-1.5 w-full gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div
              key={stepNumber}
              className={`h-full flex-1 transition-all duration-300 rounded-full ${
                isActive ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          );
        })}
      </div>

      {/* Steps counter text */}
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
