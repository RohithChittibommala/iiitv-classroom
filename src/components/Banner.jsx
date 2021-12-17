/* eslint-disable react/prop-types */
import React from "react";
import url from "../assets/undraw_reading_time_gvg0 (1).svg";

function Banner({ name, courseCode }) {
  return (
    <div className="bg-gray-500 flex  md:h-64 mx-auto mb-10 p-5 rounded-xl items-center justify-between ">
      <div className="flex flex-col">
        <h1 className="text-white  text-3xl  font-bold mr-2">
          {courseCode}-{name}
        </h1>
      </div>

      <img src={url} className="object-contain h-4/5" />
    </div>
  );
}

export default Banner;
