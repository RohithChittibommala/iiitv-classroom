import { BsBookmarksFill, BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { CgTimelapse } from "react-icons/cg";

import React from "react";

function getIcons(role) {
  const className = "w-5 h-5 text-blue-600 mr-5";

  switch (role) {
    case "admin": {
      return [
        {
          icon: <AiFillHome className={className} />,
          label: "Home",
          path: "/",
        },
        {
          icon: <CgTimelapse className={className} />,
          label: "Pending Courses",
          path: "/pending",
        },
        {
          icon: <FaUserGraduate className={className} />,
          label: "Instructors",
          path: "/instructors",
        },

        {
          icon: <BsPersonFill className={className} />,
          label: "Profile",
          path: "/profile",
        },
      ];
    }

    case "student": {
      return [
        {
          icon: <AiFillHome className={className} />,
          label: "Home",
          path: "/",
        },
        {
          icon: <BsBookmarksFill className={className} />,
          label: "Courses",
          path: "/courses",
        },
        {
          icon: <BsPersonFill className={className} />,
          label: "Profile",
          path: "/profile",
        },
      ];
    }

    case "instructor": {
      return [
        {
          icon: <AiFillHome className={className} />,
          label: "Home",
          path: "/",
        },
        {
          icon: <CgTimelapse className={className} />,
          label: "Pending Courses",
          path: "/pending",
        },
        {
          icon: <BsPersonFill className={className} />,
          label: "Profile",
          path: "/profile",
        },
      ];
    }
  }
}

export default getIcons;
