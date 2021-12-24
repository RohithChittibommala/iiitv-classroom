import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    updateProfilePic: (state, action) => {
      state.user.imageUrl = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    logout: (state) => {
      state.user = {};
      state.role = "";
    },
  },
});

export const { setUser, setRole, updateProfilePic, logout } = userSlice.actions;

export default userSlice.reducer;
