import { createSlice, combineReducers } from "@reduxjs/toolkit";

const LoginModalSlice = createSlice({
    name: "LoginModal",
    initialState: { isToggleModal: false },
    reducers: {
        toggleLoginModal: (state) => {
            state.isToggleModal = !state.isToggleModal;
        }
    }
})

// Export the action
export const { toggleLoginModal } = LoginModalSlice.actions;

// Combine reducers
const ModalReducer = combineReducers({
    loginModal: LoginModalSlice.reducer,
})

export default ModalReducer;

