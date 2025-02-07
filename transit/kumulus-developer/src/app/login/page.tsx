"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    const loginData = {
      email,
      password,
      appId:"KUMULUS_PROVIDERS"
    };
  
    try {
      const response = await fetch("http://0.0.0.0:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
      console.log("Login Response:", data);
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      // Handle successful login (e.g., store token, redirect)
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://your-backend-url.com/api/auth/google";
  };

  return (
    <div className="bg-[#f3f3f3fb] h-[100%] w-[100%] flex flex-col items-center">
      <div className="m-auto flex flex-col gap-1 items-center">
        <div className="m-auto bg-white max-w-[420px] w-[100%] min-h-[475px] shadow-md rounded-2xl p-10">
          <h2 className="text-2xl font-bold">Login to Developer Console</h2>
          <p className="mt-4 mb-6">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 underline font-semibold">
              Get Started
            </a>
          </p>

          {error && <p className="text-red-500 pt-1">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg h-14 border border-gray-300 hover:border-blue-500 focus:ring-2 focus:ring-black indent-3"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              autoComplete="current-password"
              required
              className="w-full mt-6 h-14 rounded-lg border border-gray-300 hover:border-blue-500 focus:ring-2 focus:ring-black indent-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-black w-full h-12 mt-6 rounded-lg text-white font-bold"
            >
              Login
            </button>

            <div className="flex w-[100%] mt-4 items-center">
                        <div className="bg-slate-400 w-[44%] h-[2px]"></div>
                        <div className="w-[2%]"></div>
                        <div className="text-slate-400 text-[1em] font-semibold">OR</div>
                        <div className="w-[2%]"></div>
                        <div className="bg-slate-400 align-middle w-[45%] h-[2px]"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="bg-white w-full h-12 mt-4 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 flex items-center justify-center"
            >
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                <title>Google Login</title>
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(-401 -860)">
                    <g transform="translate(401 860)">
                      <path fill="#FBBC05" d="M9.83 24a13.9 13.9 0 0 1 0-4.36L2.62 13.6a23.98 23.98 0 0 0 0 20.79l7.91-6.05A14.1 14.1 0 0 1 9.83 24z"/>
                      <path fill="#EB4335" d="M23.71 10.13a13.85 13.85 0 0 1 8.65 3.1l6.83-6.83A23.98 23.98 0 0 0 2.62 13.6l7.91 6.05a13.85 13.85 0 0 1 13.18-9.52z"/>
                      <path fill="#34A853" d="M23.71 37.87a13.85 13.85 0 0 1-13.18-9.52l-7.91 6.04a23.98 23.98 0 0 0 36.98 7.22l-7.51-5.8a13.85 13.85 0 0 1-8.65 3.06z"/>
                      <path fill="#4285F4" d="M46.15 24a23.98 23.98 0 0 0-1.3-8.08H23.71v8.08h12.61a11.2 11.2 0 0 1-4.86 7.22l7.51 5.8a24 24 0 0 0 7.18-14.94z"/>
                    </g>
                  </g>
                </g>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
