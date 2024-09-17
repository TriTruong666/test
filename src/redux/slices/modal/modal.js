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
const DetailKoiModalSlice = createSlice({
  name: "detailKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDetailKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
    toggleDetailKoiModalOff: (state) => {
      state.isToggleModal = false;
    }
  },
});
const KoiHistoryModalSlice = createSlice({
  name: "koiHistoryModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleKoiHistoryModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
    toggleKoiHistoryOn: (state) => {
      state.isToggleModal = true;
    },
    toggleKoiHistoryOff: (state) => {
      state.isToggleModal = false;
    },
  },
});
const CancelMyOrderModalSlice = createSlice({
  name: "cancelMyOrderModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleCancelMyOrderModal: (state) => {
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
export const { toggleDetailKoiModal } = DetailKoiModalSlice.actions;
export const { toggleDetailKoiModalOff } = DetailKoiModalSlice.actions;
export const { toggleKoiHistoryModal } = KoiHistoryModalSlice.actions;
export const { toggleKoiHistoryOn } = KoiHistoryModalSlice.actions;
export const { toggleKoiHistoryOff } = KoiHistoryModalSlice.actions;
export const { toggleCancelMyOrderModal } = CancelMyOrderModalSlice.actions;


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
  detailKoiModal: DetailKoiModalSlice.reducer,
  koiHistoryModal: KoiHistoryModalSlice.reducer,
  cancelMyOrderModal: CancelMyOrderModalSlice.reducer,
});

export default ModalReducer;
