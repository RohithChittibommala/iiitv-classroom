import React from "react";
import { Menu } from "@headlessui/react";
import { CgMoreVertical } from "react-icons/cg";

export function MenuOptions({ handleDelete }) {
  return (
    <Menu as="div" className="absolute right-8 rounded-md">
      <Menu.Button>
        <CgMoreVertical />
      </Menu.Button>
      <Menu.Items className="absolute right-0 md:w-40  origin-left bg-white divide-y-2 divide-gray-400  shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 rounded">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleDelete}
                className={`${
                  active ? "bg-gray-200" : "bg-white"
                } w-full  text-center  items-center p-1`}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
