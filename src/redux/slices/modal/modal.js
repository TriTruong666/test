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
const UpdatePondModalSlice = createSlice({
  name: "updatePondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdatePondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DelPondModalSlice = createSlice({
  name: "delPondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDelPondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateWaterModalSlice = createSlice({
  name: "updateWaterModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateWaterModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddKoiModalSlice = createSlice({
  name: "addKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateKoiModalSlice = createSlice({
  name: "updateKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DelKoiModalSlice = createSlice({
  name: "delKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDelKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
// Export the action
export const { toggleLoginModal } = LoginModalSlice.actions;
export const { toggleAddPondModal } = AddPondModalSlice.actions;
export const { toggleUpdatePondModal } = UpdatePondModalSlice.actions;
export const { toggleDelPondModal } = DelPondModalSlice.actions;
export const { toggleUpdateWaterModal } = UpdateWaterModalSlice.actions;
export const { toggleAddKoiModal } = AddKoiModalSlice.actions;
export const { toggleUpdateKoiModal } = UpdateKoiModalSlice.actions;
export const { toggleDelKoiModal } = DelKoiModalSlice.actions;

// Combine reducers
const ModalReducer = combineReducers({
  loginModal: LoginModalSlice.reducer,
  addPondModal: AddPondModalSlice.reducer,
  updatePondModal: UpdatePondModalSlice.reducer,
  delPondModal: DelPondModalSlice.reducer,
  updateWaterModal: UpdateWaterModalSlice.reducer,
  addKoiModal: AddKoiModalSlice.reducer,
  updateKoiModal: UpdateKoiModalSlice.reducer,
  delKoiModal: DelKoiModalSlice.reducer,
});

export default ModalReducer;
