import { createSlice, combineReducers } from "@reduxjs/toolkit";

const accountInfomationSlice = createSlice({
  name: "accountInfo",
  initialState: {
    accountInfo: {
      fullname: "",
      email: "",
    },
  },
  reducers: {
    setAccountInfo: (state, action) => {
      state.accountInfo = action.payload;
    },
    getAccountInfo: (state) => {
      return state.accountInfo;
    },
  },
});
const emailSlice = createSlice({
  name: "email",
  initialState: {
    email: "", // Correct the state structure to hold only email
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload; // Make sure we update the correct field
    },
    getEmail: (state) => {
      return state.email; // This will return the email from state
    },
  },
});
// Export the action
export const { setAccountInfo } = accountInfomationSlice.actions;
export const { getAccountInfo } = accountInfomationSlice.actions;
export const { setEmail } = emailSlice.actions;
// Combine reducers
const AccountReducer = combineReducers({
  accountInfo: accountInfomationSlice.reducer,
  email: emailSlice.reducer,
});

export default AccountReducer;
