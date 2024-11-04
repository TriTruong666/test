import { combineReducers, createSlice } from "@reduxjs/toolkit";

const blogInfomationSlice = createSlice({
  name: "blogInfo",
  initialState: {
    blogInfo: {},
  },
  reducers: {
    setBlogInfo: (state, action) => {
      state.blogInfo = action.payload;
    },
  },
});

export const { setBlogInfo } = blogInfomationSlice.actions;

// Combine reducers
const BlogReducer = combineReducers({
  blogInfo: blogInfomationSlice.reducer,
});

export default BlogReducer;
