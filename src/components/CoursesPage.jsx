/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

export const colors = [
  "red-400",
  "pink-400",
  "indigo-400",
  "gray-500",
  "purple-500",
  "green-400",
  "red-500",
  "pink-500",
  "yellow-500",
  "indigo-500",
  "purple-500",
].map((color) => ({
  color: color.split("-")[0],
  shade: parseInt(color.split("-")[1]),
}));

function CoursePage({ courses }) {
  return (
    <div className="flex-1 grid grid-cols-1  md:grid-cols-4 gap-y-2 md:gap-10 p-5 md:p-10">
      {courses?.map((course, index) => (
        <Link key={course._id} to={`course/${course._id}`}>
          <CourseCard
            bgColor={colors[index % colors.length]}
            course={course}
            showBtns={false}
          />
        </Link>
      ))}
    </div>
  );
}

export default CoursePage;
