import LandingSidePage from "@/app/company/register-company/components/LandingSidePage";
import LoginForm from "./components/LoginForm";
import AuthContextProvider from "@/app/context/auth/AuthContext";

export default function page() {
  return (
    <AuthContextProvider>
      <div className="flex flex-col md:flex-row min-h-screen  md:h-screen w-full overflow-y-auto md:overflow-hidden">
        <LandingSidePage />
        <div className="flex flex-col w-full h-fit md:h-full md:w-1/2 justify-start md:items-center md:justify-center  p-4 sm:p-8 overflow-y-auto ">
          <LoginForm />
        </div>
      </div>
    </AuthContextProvider>
  );
}
