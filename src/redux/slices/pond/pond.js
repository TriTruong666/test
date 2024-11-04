import { combineReducers, createSlice } from "@reduxjs/toolkit";

const pondInfomationSlice = createSlice({
  name: "pondInfo",
  initialState: {
    pondInfo: {},
  },
  reducers: {
    setPondInfo: (state, action) => {
      state.pondInfo = action.payload;
    },
  },
});

export const { setPondInfo } = pondInfomationSlice.actions;

// Combine reducers
const PondReducer = combineReducers({
  pondInfo: pondInfomationSlice.reducer,
});

export default PondReducer;
