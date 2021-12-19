import React from "react";

export function Announcement({ announcement, instructor }) {
  return (
    <div className="bg-white flex  flex-col space-y-2 shadow-md rounded-lg transition duration-100 border border-gray-200 ease-in my-5  border-transparent p-5">
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
      </div>
      <div className="p-2 text-gray-800">{announcement.text}</div>
    </div>
  );
}
