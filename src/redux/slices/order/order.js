import { createSlice, combineReducers } from "@reduxjs/toolkit";

const orderRequestSlice = createSlice({
  name: "orderRequest",
  initialState: {
    total: "",
    fullname: "",
    address: "",
    email: "",
    phone: "",
  },
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
  },
});
const paymentIdSlice = createSlice({
  name: "paymentId",
  initialState: { paymentId: "" },
  reducers: {
    setPaymentId: (state, action) => {
      state.paymentId = action.payload;
    },
  },
});
// Export the action
export const { setOrderRequest } = orderRequestSlice.actions;
export const { setPaymentId } = paymentIdSlice.actions;

// Combine reducers
const OrderReducer = combineReducers({
  orderRequest: orderRequestSlice.reducer,
  paymentId: paymentIdSlice.reducer,
});

export default OrderReducer;
