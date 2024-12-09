import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: {},
  NavbarMenuData: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    userdata: (state, action) => {
      state.userdata = action.payload;
    },

    NavbarMenuData: (state, action) => {
      state.NavbarMenuData = action.payload;
    },
    errorData: (state, action) => {
      state.errorData = action.payload;
    },
    courseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    activityDetails: (state, action) => {
      state.activityDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userdata,
  NavbarMenuData,
  errorData,
  courseDetails,
  activityDetails,
} = counterSlice.actions;

export default counterSlice.reducer;
