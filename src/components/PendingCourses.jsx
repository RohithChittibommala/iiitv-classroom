import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import api from "../network";
import CourseCard from "./CourseCard";
import { colors } from "./CoursesPage";
import DisplayMsg from "./DisplayMessage";
import Loading from "./Loading";

function PendingCourses() {
  const role = useSelector((state) => state.user.role);

  const fetchData = () => {
    switch (role) {
      case "admin":
        return api.getAllCourses();
      case "instructor":
        return api.getPendingCoursesByInstructor();
    }
  };

  const { data, isLoading } = useQuery("pending-courses", fetchData, {
    select: (data) => data?.data?.filter((course) => !course.isApproved),
  });

  if (isLoading) return <Loading />;

  if (data?.length === 0) return <DisplayMsg msg={"No Pending Courses"} />;

  return (
    <div className="bg-blue-50 mt-16 min-h-screen">
      <div className="flex-1 grid grid-cols-1  md:grid-cols-4 gap-y-2 md:gap-10 p-5 md:p-10">
        {data?.map((course, index) => (
          <CourseCard
            key={course._id}
            bgColor={colors[index % colors.length]}
            course={course}
            showBtns={true}
          />
        ))}
      </div>
    </div>
  );
}

export default PendingCourses;
