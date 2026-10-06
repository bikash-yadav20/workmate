"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { authMe, loginRoute } from "@/services/auth/apiService";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await authMe();
      if (response.success) {
        setUser(response.user);
        return response.user;
      }

      setUser(null);
      return null;
    } catch (error) {
      console.error("Auth verification failed:", error);
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //login route for a user
  const login = async (credentials) => {
    try {
      const response = await loginRoute(credentials);
      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      const userData = await checkAuth();
      console.log("i am user data", userData.role);

      if (userData?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isemployee: user?.role === "employee",
        login,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const authenticateContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "authenticateContext must be used within a RegisterProvider",
    );
  }
  return context;
};
