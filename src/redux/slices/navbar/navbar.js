import { createSlice, combineReducers } from "@reduxjs/toolkit";

const settingNavSlice = createSlice({
  name: "settingNav",
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
const NavbarReducer = combineReducers({
  settingNav: settingNavSlice.reducer,
});

export default NavbarReducer;
