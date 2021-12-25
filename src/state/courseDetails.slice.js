import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const courseDetailsSlice = createSlice({
  name: "course_details",
  initialState,
  reducers: {
    addCourseDetails: (state, action) => {
      state[action.payload.id] = action.payload.courseDetails;
    },

    addAnnouncement: (state, action) => {
      const { id, announcement } = action.payload;
      state[id].announcements = [announcement, ...state[id].announcements];
    },

    addAssignment: (state, action) => {
      const { id, assignment } = action.payload;

      state[id].assignments = [assignment, ...state[id].assignments];
    },
    removeAnnouncement: (state, action) => {
      const { id, announcementId } = action.payload;

      state[id].announcements = state[id].announcements.filter(
        (announcement) => announcement.id !== announcementId
      );
    },

    removeAssignment: (state, action) => {
      const { id, assignmentId } = action.payload;

      state[id].assignments = state[id].assignments.filter(
        (assignment) => assignment.id !== assignmentId
      );
    },
  },
});

export const {
  addCourseDetails,
  addAnnouncement,
  addAssignment,
  removeAnnouncement,
  removeAssignment,
} = courseDetailsSlice.actions;

export default courseDetailsSlice.reducer;
