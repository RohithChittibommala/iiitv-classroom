/* eslint-disable react/prop-types */
import React from "react";
import { MdOutlineClose } from "react-icons/md";

export default function Dialog(props) {
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div
      className="fixed inset-0 z-50 overflow-auto   flex"
      style={{ background: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{props.children}</div>
        <span className="absolute top-0 right-0 p-4">
          <MdOutlineClose
            className="text-white bg-red-500 font-bold cursor-pointer w-8 h-8 p-2 rounded-full"
            onClick={() => onClose()}
          />
        </span>
      </div>
    </div>
  );
}
