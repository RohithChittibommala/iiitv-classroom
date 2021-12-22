import React from "react";
import { Menu } from "@headlessui/react";
import { CgMoreVertical } from "react-icons/cg";

export function Announcement({ announcement, instructor, handleDelete }) {
  return (
    <div className="bg-white flex  flex-col space-y-2 relative shadow-md rounded-lg transition duration-100 border border-gray-200 ease-in my-5  border-transparent p-5">
      <div className="flex space-x-4 items-center">
        <img
          className="rounded-full w-10 h-10"
          src={instructor.imageUrl}
          alt="user_image"
        />
        <div>
          <h3 className="text-base  font-semibold capitalize">
            {instructor.name}
          </h3>
          <p className="text-xs  font-sans  text-gray-600 ">
            {new Date(announcement.date).toDateString()}
          </p>
        </div>

        <AnnouncementMenu
          handleDelete={handleDelete}
          announcementId={announcement._id}
        />
      </div>
      <div className="p-2 text-gray-800">{announcement.text}</div>
    </div>
  );
}
function AnnouncementMenu({ handleDelete, announcementId }) {
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
                onClick={() => handleDelete({ announcementId })}
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
