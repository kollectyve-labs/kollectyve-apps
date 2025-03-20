"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState<JSX.Element>(<FaEyeSlash />);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [appId, setAppId] = useState("");

  useEffect(() => {
    const generateAppId = () => Math.random().toString(36).substring(2, 10);
    setAppId(generateAppId());
  }, []);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<FaEye />);
      setType("text");
    } else {
      setIcon(<FaEyeSlash />);
      setType("password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, appId:"KUMULUS_DEVELOPERS" }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className="bg-[#f3f3f3fb] h-[100%] w-[100%] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="m-auto bg-white max-w-[420px] w-[100%] h-[600px] shadow-[rgba(145,158,171,0.08)_0px_0px_2px_0px,rgba(145,158,171,0.08)_0px_12px_24px_-4px] rounded-2xl p-[40px] transition-shadow duration-300 ease-in-out"
      >
        <div className="flex flex-wrap">
          <h4 className="font-bold leading-8 text-[1.5rem] m-0">Create your developer account</h4>
        </div>
        <div className="mt-4 mb-10">
          <p>
            You have an account?{" "}
            <Link href="/login" className="text-blue-500 underline font-semibold">
              Login
            </Link>
          </p>
        </div>

        <div className="w-[340px] flex flex-col items-center mt-6">
          <input
            type="text"
            autoComplete="username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[100%] rounded-lg h-[56px] border-[1px] hover:border-blue-500 focus:ring-2 focus:ring-black border-gray-300 text-[1rem] indent-3"
            placeholder="Name"
          />

          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] mt-6 rounded-lg h-[56px] border-[1px] hover:border-blue-500 focus:ring-2 focus:ring-black border-gray-300 text-[1rem] indent-3"
            placeholder="Email address"
          />

          <div className="flex w-[100%]">
            <input
              type={type}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[85%] mt-6 h-[56px] rounded-lg border-[1px] hover:border-blue-500 focus:ring-2 focus:ring-black border-gray-300 text-[1rem] indent-3"
              placeholder="Password"
            />

            <div className="w-[15%] mt-6 h-[56px] flex justify-center items-center cursor-pointer" onClick={handleToggle}>
              {icon}
            </div>
          </div>

          <input
            type="text"
            autoComplete="website_social"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-[100%] mt-6 h-[56px] rounded-lg border-[1px] hover:border-blue-500 focus:ring-2 focus:ring-black border-gray-300 text-[1rem] indent-3"
            placeholder="Website or Social Media"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button type="submit" className="bg-black w-[100%] h-[48px] mt-10 rounded-lg text-white text-[0.9375rem] text-center font-bold">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
