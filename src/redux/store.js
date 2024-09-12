import { configureStore } from "@reduxjs/toolkit";
// import reducer
import ModalReducer from "./slices/modal/modal";
import navbarReducer from "./slices/navbar/navbar";
export default configureStore({
  reducer: {
    // modal
    loginModal: ModalReducer,
    // navbar
    settingNav: navbarReducer,
  },
});
