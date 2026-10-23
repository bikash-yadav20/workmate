import AuthContextProvider from "./auth/AuthContext";
import SalaryPeriodContextProvider from "./salaryPeriod/SalaryPeriodContext";
import UserContextProvider from "./userContext/UserContext";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <SalaryPeriodContextProvider>{children}</SalaryPeriodContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
