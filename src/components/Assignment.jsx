import React from "react";
import DropboxChooser from "react-dropbox-chooser";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../network";

export function Assignment({ assignment, instructor, courseCode }) {
  const { user, role } = useSelector((state) => state.user);

  const [isSubmitted, setIsSubmitted] = React.useState(
    assignment?.submissions
      .map((submission) => submission?.studentId)
      .includes(user._id)
  );

  const { mutate: addSubmission } = useMutation(
    (data) => api.submitAssignment(data),
    {
      onSuccess: () => {
        toast.success("Assignment submitted successfully");
        setIsSubmitted(true);
      },
    }
  );

  const handleAssignmentSubmit = (files) => {
    const file = files[0];

    addSubmission({
      courseCode,
      assignmentId: assignment._id,
      pdf: file.link,
      studentId: user._id,
    });
  };

  console.log(
    assignment.submissions
      ?.map((submission) => submission?.studentId)
      .includes(user._id)
  );

  return (
    <div className="bg-white flex flex-col space-y-1 shadow-md rounded-lg transition duration-100 border border-gray-200 ease-in my-2  border-transparent p-5">
      <div className="flex space-x-4 items-center  ">
        <img
          className="rounded-full w-10 h-10"
          src={instructor.imageUrl}
          alt="user_image"
        />
        <div>
          <h3 className="text-base  font-semibold capitalize">
            {instructor.name}
          </h3>
          <p className="text-xs  font-sans  text-gray-600 ">
            {new Date(assignment.date).toDateString()}
          </p>
        </div>
      </div>
      <div className="p-2 text-gray-800 flex flex-col space-y-1">
        <p>{assignment.description}</p>
        <div className="flex items-center space-x-3 ">
          {assignment.pdf && (
            <button className="my-2  btn  outline-primary  uppercase ">
              <a href={assignment.pdf} rel="noreferrer" target="_blank">
                Assignment file
              </a>
            </button>
          )}

          {role === "student" && !isSubmitted && (
            <DropboxChooser
              appKey={import.meta.env.VITE_DROP_BOX_KEY}
              success={handleAssignmentSubmit}
              cancel={() => console.log("cancelled")}
              extensions={[".pdf"]}
            >
              <p className="btn px-4 py-2 text-sm cursor-pointer font-semibold hover:text-gray-600 hover:border-gray-600  border-gray-600">
                ADD SUBMISSION
              </p>
            </DropboxChooser>
          )}

          {isSubmitted && (
            <p className="text-green-800 font-semibold"> Turned In</p>
          )}
        </div>
        <p className="text-red-500 text-sm mt-2">
          Due - {"    "}
          {new Date(assignment.deadline).toLocaleString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {"    "}
          {new Date(assignment.deadline).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {role === "instructor" && (
          <Link to={`/submissions/${assignment._id}`}>
            <button className="outline-success ">View Submissions</button>
          </Link>
        )}
      </div>
    </div>
  );
}
