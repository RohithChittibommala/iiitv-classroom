import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../state/sidebarSlice";

function NavBar() {
  const dispatch = useDispatch();

  return (
    <div
      className={` px-10 fixed w-full z-20 cursor-pointer py-4 bg-white  border-b border-gray-200 transition  `}
    >
      <HiMenuAlt1
        className="h-10 w-10 p-2 text-black    transition hover:bg-gray-200 rounded-full"
        onClick={() => dispatch(toggleSidebar())}
      />
    </div>
  );
}

export default NavBar;
