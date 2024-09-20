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

// Export the action
export const { setAccountInfo } = accountInfomationSlice.actions;
export const { getAccountInfo } = accountInfomationSlice.actions;

// Combine reducers
const AccountReducer = combineReducers({
  accountInfo: accountInfomationSlice.reducer,
});

export default AccountReducer;
