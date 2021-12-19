/* eslint-disable react/prop-types */
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import Loading from "./Loading";
import api from "../network";
import CreateAnnouncement from "../modals/CreateAnnouncement";
import CreateAssignment from "../modals/CreateAssignment";
import { addCourseDetails } from "../state/courseDetails.slice";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";

function CourseDetails() {
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const courseDetails = useSelector((state) => state.courseDetails[courseId]);

  const userId = useSelector((state) => state.user?.user._id);

  const [currentTab, setCurrentTab] = React.useState("one");

  const navigate = useNavigate();

  const { isLoading } = useQuery(
    ["course-details", courseId],
    () => api.getCourseDetailsById(courseId),
    {
      onSuccess: ({ data }) => {
        dispatch(
          addCourseDetails({
            id: courseId,
            courseDetails: data,
          })
        );
      },
    }
  );

  if (!courseDetails && isLoading) return <Loading />;

  return (
    <div
      className="w-full mt-8 min-h-screen md:p-20 p-5 light-blue "
      // style={{ backgroundColor: "hsl(231deg 48% 98%)" }}
    >
      <div className="w-full md:w-8/12 mx-auto">
        <button className="mb-3 flex " onClick={() => navigate(-1)}>
          <BsArrowLeft className="w-6 h-6 mr-1" /> Go Back
        </button>
        <Banner
          name={courseDetails.name}
          courseCode={courseDetails.courseCode}
        />

        {courseDetails.instructor[0]._id === userId && (
          <div className="  flex mb-10 mt-3 ">
            <CreateAnnouncement
              courseCode={courseDetails.courseCode}
              courseId={courseId}
            />
            <CreateAssignment
              courseCode={courseDetails.courseCode}
              courseId={courseId}
            />
          </div>
        )}

        <div className=" bg-white  ">
          <Tabs
            value={currentTab}
            onChange={(e, val) => setCurrentTab(val)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="one" label="Announcements" />
            <Tab value="two" label="Assignments" />
          </Tabs>
        </div>
        <div className=" mt-10">
          <TabPanel value={"one"} current={currentTab}>
            {courseDetails?.announcements.map((announcement) => (
              <Announcement
                key={announcement._id}
                announcement={announcement}
                instructor={courseDetails?.instructor[0]}
              />
            ))}
          </TabPanel>
          <TabPanel value={"two"} current={currentTab}>
            {courseDetails?.assignments.map((assignment) => (
              <Assignment
                key={assignment._id}
                assignment={assignment}
                instructor={courseDetails?.instructor[0]}
              />
            ))}
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== current}
      id={`simple-tabpanel-${current}`}
      aria-labelledby={`simple-tab-${current}`}
      {...other}
    >
      {value === current && children}
    </div>
  );
}

function Assignment({ assignment, instructor }) {
  const { user, role } = useSelector((state) => state.user);

  const [isSubmitted, setIsSubmitted] = React.useState(
    assignment?.submissions
      .map((submission) => submission?.studentId)
      .includes(user._id)
  );

  console.log(
    assignment.submissions
      .map((submission) => submission?.studentId)
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
      <div className="p-2 text-gray-800 flex flex-col space-y-3">
        <p>{assignment.description}</p>
        <div className="flex items-center space-x-3 ">
          <button className="my-2  btn  outline-primary  uppercase ">
            <a href={assignment.pdf} rel="noreferrer" target="_blank">
              Assignment file
            </a>
          </button>

          {role === "student" && !isSubmitted && (
            <p className="btn px-4 py-2 text-sm cursor-pointer font-semibold hover:text-gray-600 hover:border-gray-600  border-gray-600">
              ADD SUBMISSION
            </p>
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
      </div>
    </div>
  );
}

function Announcement({ announcement, instructor }) {
  return (
    <div className="bg-white flex  flex-col space-y-2 shadow-md rounded-lg transition duration-100 border border-gray-200 ease-in my-5  border-transparent p-5">
      <div className="flex space-x-4 items-center">
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
            {new Date(announcement.date).toDateString()}
          </p>
        </div>
      </div>
      <div className="p-2 text-gray-800">{announcement.text}</div>
    </div>
  );
}

export default CourseDetails;
