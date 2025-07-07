"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

import { LuMonitorDot } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import Nav from "@/components/shared/Nav";
import Spinner from "@/components/shared/Spinner";
import { useSpinner } from "@/contexts/SpinnerContext";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useSpinner();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dash",
      icon: <LuMonitorDot />,
    },

    {
      label: "Products",
      href: "/dash/products",
      icon: <FiShoppingCart />,
    },
    {
      label: "Hesabatlar",
      href: "/dash/reports",
      icon: <MdOutlineAttachMoney />,
    },
    {
      label: "Xərclər",
      href: "/dash/expenses",
      icon: <MdOutlineAttachMoney />,
    },

    // { label: "Ayarlar", href: "/user/settings", icon: <FiSettings /> },
    { label: "Çıxış", href: "/logout", icon: <FiLogOut /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex min-h-screen w-screen">
      {isLoading && <Spinner />}
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-base-100 border-r border-base-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 h-screen`}
      >
        {/* <div className="px-2 border-b border-base-300 flex justify-between items-center md:hidden">
          <Link href="/" className=" font-semibold text-primary text-2xl">
            Lime Store
          </Link>
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        </div> */}

        <div className="p-4 text-center">
          <Link href="/" className=" font-semibold text-primary text-2xl">
            Lime Store
          </Link>
        </div>

        <nav className="px-2 space-y-0">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 text-sm px-4 py-2 rounded-md transition my-2 ${
                pathname === item.href ? "bg-base-200" : "hover:bg-base-200"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 ml-0 h-screen max-w-screen w-full ">
        {/* Top bar (mobile only)
        <div className="md:hidden p-4 border-b border-base-300 flex items-center justify-between bg-base-100">
          <button className="cursor-pointer" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <Link href="/" className=" font-semibold text-primary text-2xl">
            Vakant
          </Link>
        </div> */}

        <Nav clickAction={toggleSidebar} />

        <main className="bg-base-200 h-[calc(100vh-64px)] w-full">
          {children}
        </main>
      </div>
      <div
        className={` ${
          sidebarOpen ? "block" : "hidden"
        } absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}
