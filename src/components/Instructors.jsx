/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useQuery } from "react-query";
import api from "../network";
import Loading from "./Loading";

function Instructors() {
  const { data: instructors, isLoading } = useQuery(
    "instructors",
    api.getAllInstructors,
    {
      select: (data) => data.data,
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white min-h-screen mt-20">
      <div className="md:w-3/5 p-5 mx-auto mt-1">
        <h3 className="text-blue-600 font-normal p-3 border-b border-blue-500 text-3xl">
          Instructors
        </h3>

        <div className="mt-5 divide-y">
          {instructors.map((instructor) => (
            <Instructor key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Instructor({ instructor }) {
  const { name, email, imageUrl } = instructor;

  return (
    <div className="p-4 flex items-center">
      <img src={imageUrl} className="w-8 h-8 rounded-full mr-5" alt="" />
      <p className="text-sm uppercase font-medium">{name} </p>
      <a href={`mailto:${email}`} className="ml-auto">
        <AiOutlineMail className="w-5 h-5  text-gray-600" />
      </a>
    </div>
  );
}

export default Instructors;
