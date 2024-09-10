import { configureStore } from "@reduxjs/toolkit";
// import reducer 
import ModalReducer from "./slices/modal/modal";
export default configureStore({
    reducer: {
        loginModal: ModalReducer,
    }
})