/* eslint-disable react/prop-types */
import React from "react";

function DisplayMsg({ msg }) {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <h1 className="text-4xl text-gray-400 font-bold   ">{msg}</h1>
    </div>
  );
}

export default DisplayMsg;
