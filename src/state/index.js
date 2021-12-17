/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import courseDetailsReducer from "./courseDetails.slice";
import coursesReducer from "./coursesSlice";
import otherCoursesReducer from "./otherCoursesSlice";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    otherCourses: otherCoursesReducer,
    sidebar: sidebarReducer,
    courseDetails: courseDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
