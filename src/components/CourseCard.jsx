/* eslint-disable react/prop-types */
import React from "react";
import ShowButtons from "./ShowButtons";

function CourseCard({ bgColor: background, course, showBtns }) {
  const [effect, setEffect] = React.useState(false);

  const [bgColor] = React.useState(background);

  return (
    <div
      className={`relative group w-full h-80 delay-150  p-5 flex flex-col space-y-2  text-left bg-gradient-to-br  from-red-300  to-pink-400  group-hover duration-150 cursor-pointer hover:to-yellow-500 hover:scale-95 ease-in  transition transform  overflow-hidden  rounded-xl ${
        effect ? " opacity-0 translate-y-60" : ""
      }   `}
    >
      <h2 className="text-3xl truncate  font-semibold text-white  text-shadow-md">
        {course.courseCode}
      </h2>
      <h2 className="text-3xl truncate font-semibold text-white  text-shadow-md">
        {course.name}
      </h2>
      <p className="text-base text-white text-shadow-md  md:line-clamp-4">
        {course.description}
      </p>

      <div className=" hidden md:flex items-center group-hover:invisible transition right-6 w-full font-medium justify-end    absolute bottom-10">
        <p className="text-white text-sm mr-2">-</p>
        <img
          src={course.instructor[0].imageUrl}
          className="w-6 h-6 rounded-full  mr-2 border-2 border-blue-200 block"
        />
        <p className="text-white text-sm capitalize">
          {course.instructor[0].name}
        </p>
      </div>

      {showBtns && (
        <ShowButtons
          courseCode={course.courseCode}
          bgColor={bgColor}
          onClickHandler={() => setEffect(true)}
        />
      )}
    </div>
  );
}

export default CourseCard;
