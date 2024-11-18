import { combineReducers, createSlice } from "@reduxjs/toolkit";
const koiSlice = createSlice({
  name: "koiId",
  initialState: {
    koiId: "",
  },
  reducers: {
    setKoiId: (state, action) => {
      state.koiId = action.payload;
    },
    getKoiId: (state) => {
      return state.productId;
    },
  },
});

const koiInfomationSlice = createSlice({
  name: "koiInfo",
  initialState: {
    koiInfo: {},
  },
  reducers: {
    setKoiInfo: (state, action) => {
      state.koiInfo = action.payload;
    },
  },
});

// Export the action
export const { setKoiId, getKoiId } = koiSlice.actions;
export const { setKoiInfo } = koiInfomationSlice.actions;
// Combine reducers
const KoiReducer = combineReducers({
  koiId: koiSlice.reducer,
  koiInfo: koiInfomationSlice.reducer,
});

export default KoiReducer;
