import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const otherCoursesSlice = createSlice({
  name: "other_courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },

    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },

    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { addCourse, removeCourse, setCourses } =
  otherCoursesSlice.actions;

export default otherCoursesSlice.reducer;
