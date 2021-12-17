import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import api from "../network";
import { setCourses } from "../state/coursesSlice";
import AdminOptions from "./AdminOptions";
import CoursePage from "./CoursesPage";
import DisplayMsg from "./DisplayMessage";
import Loading from "./Loading";
import InstructorOptions from "./InstructorOptions";

function Home() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const role = useSelector((state) => state.user.role);

  function fetchCourses() {
    switch (role) {
      case "admin":
        return api.getApprovedCourses();
      case "student":
        return api.getEnrolledCourses();
      default:
        return api.getCoursesByInstructor();
    }
  }

  const { isLoading, isError, error } = useQuery("home", fetchCourses, {
    onSuccess: ({ data }) => {
      if (role === "student") {
        dispatch(setCourses(data?.courses));
      } else {
        dispatch(setCourses(data));
      }
    },
  });
  if (isError) return <DisplayMsg msg={error.message} />;

  if (isLoading) return <Loading />;

  return (
    <div className="bg-blue-50 flex flex-col mt-18 min-h-screen ">
      {role === "instructor" && <InstructorOptions />}
      {role === "admin" && <AdminOptions />}
      <CoursePage courses={courses} />
    </div>
  );
}

export default Home;
