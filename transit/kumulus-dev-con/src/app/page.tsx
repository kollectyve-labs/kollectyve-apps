"use client";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard"); // Redirect immediately to /dashboard
  return null; // Since we are redirecting, we don't need to render anything
}

