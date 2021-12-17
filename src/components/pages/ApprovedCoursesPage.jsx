import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import api from "../../network";
import CourseCard from "../CourseCard";
import { colors } from "../CoursesPage";

import DisplayMsg from "../DisplayMessage";
import Loading from "../Loading";

function ApprovedCoursesPage() {
  const enrolledCourses = useSelector((state) => state?.courses.courses);

  const enrolledCoursesSet = new Set(
    enrolledCourses.map((course) => course.courseCode)
  );

  const filterOutEnrolledCourses = (course) =>
    !enrolledCoursesSet.has(course.courseCode);

  const { data, isLoading } = useQuery(
    "all-approved-courses",
    api.getApprovedCourses,
    {
      select: (data) => data.data,
    }
  );

  if (isLoading) return <Loading />;

  const unenrolledCourses = data.filter(filterOutEnrolledCourses);

  if (unenrolledCourses.length === 0)
    return <DisplayMsg msg="No new courses left, come back after some time" />;

  return (
    <div className="bg-blue-50 mt-16 min-h-screen">
      <div className="flex-1 grid grid-cols-1  md:grid-cols-4 gap-y-2 md:gap-10 p-5 md:p-10">
        {unenrolledCourses?.map((course, index) => (
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

export default ApprovedCoursesPage;
