/* eslint-disable react/prop-types */
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CreateAnnouncement from "../modals/CreateAnnouncement";
import CreateAssignment from "../modals/CreateAssignment";
import {
  addCourseDetails,
  removeAnnouncement,
} from "../state/courseDetails.slice";
import Loading from "./Loading";
import api from "../network";
import Banner from "./Banner";
import { Assignment } from "./Assignment";
import { Announcement } from "./Announcement";
import { toast } from "react-toastify";

function CourseDetails() {
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const courseDetails = useSelector((state) => state.courseDetails[courseId]);

  const instructorId = courseDetails?.instructor[0]._id;

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

  const { mutate: deleteAnnouncement } = useMutation(
    (data) => api.deleteAnnouncement(data),
    {
      onSuccess: () => {
        toast.success("Announcement deleted successfully");
      },
    }
  );

  const { mutate: deleteAssignment } = useMutation(
    (data) => api.deleteAssignment(data),
    {
      onSuccess: () => {
        toast.success("Assignment deleted successfully");
      },
    }
  );

  const handleAnnouncementDelete = (announcementId) => {
    deleteAnnouncement({
      announcementId,
      courseCode: courseDetails.courseCode,
    });

    dispatch(
      removeAnnouncement({
        id: courseId,
        announcementId,
      })
    );
  };

  const handleAssignmentDelete = (assignmentId) => {
    deleteAssignment({ assignmentId, courseCode: courseDetails.courseCode });
  };

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

        {instructorId === userId && (
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
                handleDelete={handleAnnouncementDelete}
                isInstructor={instructorId === userId}
                announcement={announcement}
                courseCode={courseDetails.courseCode}
                instructor={courseDetails?.instructor[0]}
              />
            ))}
          </TabPanel>
          <TabPanel value={"two"} current={currentTab}>
            {courseDetails?.assignments.map((assignment) => (
              <Assignment
                key={assignment._id || assignment.id}
                assignment={assignment}
                handleDelete={handleAssignmentDelete}
                isInstructor={instructorId === userId}
                courseCode={courseDetails.courseCode}
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

export default CourseDetails;
