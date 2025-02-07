"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <aside className="sidebar text-black bg-white h-full w-[245px] py-[25px] px-[20px] border-r-[1px] border-[#e0e0e0] overflow-hidden">
      <div className="logo text-[1.5rem] leading-[28px] font-bold text-[#6200ee] py-[16px] mb-[20px] border-b-[1px] border-[#e0e0e0]">
        Developer Console
      </div>
      <div className="flex flex-col gap-[4px] font-sans">
        {[
          { name: "Dashboard", path: "/" },
          { name: "Applications", path: "/applications" },
          { name: "Marketplace", path: "/marketplace" },
          { name: "Monitoring", path: "/monitoring" },
          { name: "Billing", path: "/billing" },
          { name: "Settings", path: "/settings" },
        ].map(({ name, path }) => (
          <Link
            key={path}
            href={path}
            className={`nav-item py-[5.5px] rounded-[6px] duration-500 transition-all cursor-pointer ${
              pathname === path || (path === "/" && pathname === "/dashboard") 
                ? "bg-[#6200ee] text-white" 
                : "hover:bg-black hover:text-white"
            }`}
          >
            <p className="m-[4px] px-[12px] font-sans">{name}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
