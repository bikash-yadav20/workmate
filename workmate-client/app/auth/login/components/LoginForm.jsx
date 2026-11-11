"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { authenticateContext } from "@/app/context/auth/AuthContext";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [redHighlight, setRedHighlight] = useState(false);

  //login function from auth context and user data
  const { login, user } = authenticateContext();

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        identifier: identifier,
        password: password,
      });
      console.log(response);

      if (response.success) {
        toast.success("Login succesfull");
        // Navigation is handled by the login function in AuthContext
      } else {
        toast.error(response.error);
        setRedHighlight(true);
      }
    } catch (error) {
      toast.error("Login failed", error.message);
    }
  };

  return (
    <div className="flex md:min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[540px]  w-full md:w-screen mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Welcome
        </h2>

        {/* Email Input */}
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-1.25-1.25-1.25-1.25Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className={`w-full outline-none bg-transparent py-2.5 px-1 ${redHighlight ? "border border-red-500 focus:ring-red-500" : ""}`}
            type="text"
            placeholder="Email or Employee Id"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            className={`w-full bg-transparent py-2.5 px-1 outline-none ${
              redHighlight
                ? "border border-red-500 focus:ring-1 focus:ring-red-500"
                : ""
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <input
              id="checkbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor="checkbox" className="cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <p className="text-blue-600 underline hover:text-blue-700">
            Forgot Password
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mb-3 bg-emerald-400 cursor-pointer hover:bg-emerald-500/90 transition py-2.5 rounded text-white font-medium"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
