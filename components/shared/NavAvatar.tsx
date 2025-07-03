import Link from "next/link";
import React from "react";
import { LuSettings2, LuUser, LuLogOut } from "react-icons/lu";

const NavAvatar = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex gap-2 items-center cursor-pointer hover:bg-base-300 p-1 rounded "
      >
        <div className="w-8 ">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col ml-1 gap-0">
          <span className="text-sm text-black">Sadi</span>
          <span className="text-xs text-base-content">Admin</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link href={"/profile"} className="flex gap-2 text-sm">
            <LuUser />
            <span>Profile</span>
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li>
         <Link href={"/profile"} className="flex gap-2 text-sm">
             <LuSettings2 />
            <span>Settings</span>
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li>
        <Link href={"/profile"} className="flex gap-2 text-sm text-error hover:bg-error/30">
            <LuLogOut />
            <span>Logout</span>
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavAvatar;
