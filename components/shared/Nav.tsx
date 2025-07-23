import React from "react";
import {
  LuSettings2,
  LuMonitor,
  LuBell,
  LuMenu,
  LuSearch,
  LuHouse,
} from "react-icons/lu";
import Input from "./Input";
import NavAvatar from "./NavAvatar";
import NavThemeSelector from "./NavThemeSelector";

type Props = {
  clickAction?: () => void;
};

const Nav: React.FC<Props> = ({ clickAction }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start space-x-3">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-square md:hidden "
          onClick={clickAction}
        >
          <LuMenu className="text-xl" />
        </div>

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-square hidden md:flex "
        >
          <LuHouse className="text-xl" />
        </div>

        <div>
          <Input size="md" icon={<LuSearch />} placeholder="Axtar..." />
        </div>
      </div>
      {/* <div className="navbar-center">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div> */}
      <div className="navbar-end space-x-2">
        {/* <button className="btn btn-ghost btn-circle">
          <LuSettings2 className="text-xl" />
        </button> */}

        <NavThemeSelector />
        
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <LuBell className="text-xl" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <NavAvatar />
      </div>
    </div>
  );
};

export default Nav;
