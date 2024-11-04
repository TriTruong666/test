import { combineReducers, createSlice } from "@reduxjs/toolkit";

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
const orderIdSlice = createSlice({
  name: "orderId",
  initialState: { orderId: "" },
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

const orderInfoNewSlice = createSlice({
  name: "orderInfo",
  initialState: {
    orderInfo: {},
  },
  reducers: {
    setOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
    },
  },
});

// Export the action
export const { setOrderRequest } = orderRequestSlice.actions;
export const { setPaymentId } = paymentIdSlice.actions;
export const { setOrderId } = orderIdSlice.actions;
export const { setOrderInfo } = orderInfoNewSlice.actions;

// Combine reducers
const OrderReducer = combineReducers({
  orderRequest: orderRequestSlice.reducer,
  paymentId: paymentIdSlice.reducer,
  orderId: orderIdSlice.reducer,
  orderInfo: orderInfoNewSlice.reducer,
});

export default OrderReducer;
