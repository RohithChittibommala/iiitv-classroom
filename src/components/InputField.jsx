/* eslint-disable react/prop-types */
import React from "react";

function InputField({ label, multiline, ...props }) {
  if (multiline) {
    return (
      <div className="my-5">
        <label
          className={`my-1 block font-${
            props.bold ? "bold" : "medium"
          } text-gray-800 `}
        >
          {label}
        </label>
        <textarea rows={4} type={"text"} {...props} className="input" />
        {props.error && <p className="text-red-600 my-2">{props.error}</p>}
      </div>
    );
  }

  return (
    <div className="my-5">
      <label
        className={`my-1 block font-${
          props.bold ? "bold" : "medium"
        } text-gray-800 `}
      >
        {label}
      </label>
      <input type={props.type || "text"} {...props} className="input" />

      {props.error && <p className="text-red-600 my-2">{props.error}</p>}
    </div>
  );
}

export default InputField;
