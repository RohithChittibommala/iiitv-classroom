import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../network";
import { toggleSidebar } from "../state/sidebarSlice";
import { logout } from "../state/userSlice";

function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUserLogout = () => {
    api
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch(() => {
        toast.error("Logout Failed");
      });
  };

  return (
    <div
      className={` px-10 flex justify-between items-center fixed w-full z-20 cursor-pointer py-4 bg-white  border-b border-gray-200 transition  `}
    >
      <HiMenuAlt1
        className="h-10 w-10 p-2 text-black    transition hover:bg-gray-200 rounded-full"
        onClick={() => dispatch(toggleSidebar())}
      />

      <button className="primary btn" onClick={handleUserLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
