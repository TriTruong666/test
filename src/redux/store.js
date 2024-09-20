import { configureStore } from "@reduxjs/toolkit";
// import reducer
import ModalReducer from "./slices/modal/modal";
import NavbarReducer from "./slices/navbar/navbar";
import AccountReducer from "./slices/account/account";
export default configureStore({
  reducer: {
    // modal
    modal: ModalReducer,
    // navbar
    navbar: NavbarReducer,
    // account
    account: AccountReducer,
  },
});
