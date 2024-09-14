import { createSlice, combineReducers } from "@reduxjs/toolkit";

const LoginModalSlice = createSlice({
  name: "loginModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleLoginModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddPondModalSlice = createSlice({
  name: "addPondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddPondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
// Export the action
export const { toggleLoginModal } = LoginModalSlice.actions;
export const { toggleAddPondModal } = AddPondModalSlice.actions;
// Combine reducers
const ModalReducer = combineReducers({
  loginModal: LoginModalSlice.reducer,
  addPondModal: AddPondModalSlice.reducer,
});

export default ModalReducer;
