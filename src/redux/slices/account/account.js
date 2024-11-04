import { combineReducers, createSlice } from "@reduxjs/toolkit";

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

const accountInfomationNewSlice = createSlice({
  name: "accountInfoNew",
  initialState: {
    accountInfoNew: {},
  },
  reducers: {
    setAccountInfoNew: (state, action) => {
      state.accountInfoNew = action.payload;
    },
  },
});
const emailSlice = createSlice({
  name: "email",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    getEmail: (state) => {
      return state.email;
    },
  },
});
const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otp: "",
  },
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    getOtp: (state) => {
      return state.otp;
    },
  },
});
const userIdSlice = createSlice({
  name: "userId",
  initialState: {
    userId: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
// Export the action
export const { setAccountInfo, getAccountInfo } =
  accountInfomationSlice.actions;
export const { setEmail } = emailSlice.actions;
export const { setOtp } = otpSlice.actions;
export const { setUserId } = userIdSlice.actions;
export const { setAccountInfoNew } = accountInfomationNewSlice.actions;

// Combine reducers
const AccountReducer = combineReducers({
  accountInfo: accountInfomationSlice.reducer,
  email: emailSlice.reducer,
  otp: otpSlice.reducer,
  userId: userIdSlice.reducer,
  accountInfoNew: accountInfomationNewSlice.reducer,
});

export default AccountReducer;
