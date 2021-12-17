import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const courseDetailsSlice = createSlice({
  name: "course_details",
  initialState,
  reducers: {
    addCourseDetails: (state, action) => {
      ({
        action,
      });

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
  },
});

export const { addCourseDetails, addAnnouncement, addAssignment } =
  courseDetailsSlice.actions;

export default courseDetailsSlice.reducer;
