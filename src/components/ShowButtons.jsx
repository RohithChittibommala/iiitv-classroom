/* eslint-disable react/prop-types */
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import api from "../network";

function ShowButtons(props) {
  const role = useSelector((state) => state.user.role);

  switch (role) {
    case "student":
      return <StudentBtns {...props} />;

    case "admin":
      return <AdminBtns {...props} />;

    default:
      return <></>;
  }
}

function StudentBtns({ courseCode, onClickHandler }) {
  // const removeCourse = useSelector((state) => state.otherCourses.removeCourse);

  const queryClient = useQueryClient();

  const { mutate: enroll } = useMutation(() => api.enrollInCourse(courseCode), {
    onSuccess: () => {
      queryClient.setQueryData("all-approved-courses", (oldData) => {
        return {
          ...oldData,
          data: [
            ...oldData.filter((course) => course.courseCode !== courseCode),
          ],
        };
      });
    },
  });

  const handleCourseEnrollement = () => {
    onClickHandler();
    setTimeout(enroll, 170);
  };

  return (
    <div className="absolute bottom-20 w-3/4">
      <button
        onClick={handleCourseEnrollement}
        className={` bg-red-200 course-card-btn   text-red-900  w-full mr-2 border-red-800     `}
      >
        Enroll
      </button>
    </div>
  );
}

function AdminBtns({ onClickHandler, bgColor, courseCode }) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.setQueryData("all-approved-courses", (oldData) => {
      return {
        ...oldData,
        data: [...oldData.filter((course) => course.courseCode !== courseCode)],
      };
    });
  };

  const { mutate: rejectCourse } = useMutation(
    () => api.rejectCourse({ courseCode }),
    {
      onSuccess,
    }
  );

  const { mutate: approveCourse } = useMutation(
    () => api.approveCourse({ courseCode }),
    {
      onSuccess,
    }
  );

  const handleCourseApproval = () => {
    onClickHandler();
    setTimeout(approveCourse, 170);
  };

  const handleCourseDelete = () => {
    onClickHandler();
    setTimeout(rejectCourse, 170);
  };

  return (
    <div className="flex justify-between ">
      <button
        onClick={handleCourseApproval}
        className={`bg-${bgColor.color}-${
          bgColor.shade - 200
        } course-card-btn   text-${bgColor.color}-${
          bgColor.shade + 500
        }  w-full mr-2 border-${bgColor.color}-${bgColor.shade + 400}   `}
      >
        Approve
      </button>

      <button
        onClick={handleCourseDelete}
        className={`bg-${bgColor.color}-${
          bgColor.shade - 200
        } w-full ml-2 course-card-btn text-${bgColor.color}-${
          bgColor.shade + 500
        }  border-${bgColor.color}-${bgColor.shade + 400}   `}
      >
        Reject
      </button>
    </div>
  );
}

export default ShowButtons;
