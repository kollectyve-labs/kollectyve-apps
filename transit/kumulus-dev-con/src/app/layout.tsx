"use client";


import Sidebar from "./components/sidebar"; // Ensure correct path
import { usePathname } from "next/navigation";
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route

  // Routes that should NOT have the sidebar
  const authRoutes = ["/login", "/register"];

  return (
    <html lang="en">
      <body className="w-[100%] h-[100vh] flex flex-row">
        {!authRoutes.includes(pathname) && <Sidebar />}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}