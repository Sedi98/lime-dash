"use client";
import { useState, useEffect } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

import { LuMonitorDot } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import Nav from "@/components/shared/Nav";
import Spinner from "@/components/shared/Spinner";
import { useSpinner } from "@/contexts/SpinnerContext";
import { useUser } from "@/contexts/UserContext";
import { themeChange } from "theme-change";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = useUser();
  const router = useRouter();
  const { isLoading } = useSpinner();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await getUser();
    if (!user) {
      router.push("not-found");
    } else {
      setShowContent(true);
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dash",
      icon: <LuMonitorDot />,
    },

    {
      label: "Mallar",
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

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex min-h-screen w-screen">
      {isLoading && <Spinner />}
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 min-w-64 bg-base-100 border-r border-base-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 h-screen`}
      >
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
      <div className="flex-1 ml-0 h-screen w-full  md:w-[calc(100%-256px)] ">
        <Nav clickAction={toggleSidebar} />
        {showContent && (
          <main className="bg-base-200 h-[calc(100vh-64px)] w-full">
            {children}
          </main>
        )}
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
