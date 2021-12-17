/* eslint-disable react/prop-types */
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import getIcons from "../icons";
import { toggleSidebar } from "../state/sidebarSlice";

function SideBar() {
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();

  const showSidebar = useSelector((state) => state.sidebar.showSidebar);

  const { pathname } = useLocation();

  const sideBarIcons = React.useMemo(() => getIcons(role), [role]);

  return (
    <div
      className={`w-60  z-30 flex  flex-col transform  bg-white fixed  left-0 bottom-0 border-r border-gray-100 duration-200 transition h-screen ${
        showSidebar ? "translate-x-0" : " -translate-x-full"
      } px-2 py-8 border-r border-gray-400 duration-200 transition`}
    >
      <MdOutlineClose
        className={`h-10 w-10 transition hover:bg-gray-100 rounded-full absolute top-2 right-2 cursor-pointer transform  duration-200  p-2 ${
          showSidebar ? "translate-x-0" : " -translate-x-full"
        }`}
        onClick={() => dispatch(toggleSidebar())}
      />

      <div className="flex flex-col flex-1 space-y-3 mt-8">
        {sideBarIcons.map(({ icon, path, label }) => (
          <SideBarItem
            key={path}
            active={path === pathname}
            onClick={() => dispatch(toggleSidebar())}
            label={label}
            Icon={icon}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}

function SideBarItem(props) {
  const { label, path, Icon, active } = props;

  const className = classNames(
    "flex  items-center px-4 py-2  rounded-md text-gray-600 transition-colors transform",
    {
      "bg-blue-50 text-blue-600": active,
      "hover:bg-gray-100": !active,
    }
  );

  return (
    <Link to={path}>
      <div className={className} onClick={props.onClick}>
        {Icon}
        <span className="ml-2">{label}</span>
      </div>
    </Link>
  );
}

export default SideBar;
