import { createSlice, combineReducers } from "@reduxjs/toolkit";

const settingNavSlice = createSlice({
  name: "SettingNav",
  initialState: { isToggleNav: false },
  reducers: {
    toggleSettingNav: (state) => {
      state.isToggleNav = !state.isToggleNav;
    },
  },
});

// Export the action
export const { toggleSettingNav } = settingNavSlice.actions;

// Combine reducers
const navbarReducer = combineReducers({
  settingNav: settingNavSlice.reducer,
});

export default navbarReducer;
