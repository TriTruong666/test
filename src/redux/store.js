import { configureStore } from "@reduxjs/toolkit";
// import reducer
import AccountReducer from "./slices/account/account";
import BlogReducer from "./slices/blog/blog";
import CartReducer from "./slices/cart/cart";
import KoiReducer from "./slices/koi/koi";
import ModalReducer from "./slices/modal/modal";
import NavbarReducer from "./slices/navbar/navbar";
import OrderReducer from "./slices/order/order";
import ProductReducer from "./slices/product/product";
export default configureStore({
  reducer: {
    // modal
    modal: ModalReducer,
    // navbar
    navbar: NavbarReducer,
    // account
    account: AccountReducer,
    // product
    product: ProductReducer,
    // koi
    koi: KoiReducer,
    // cart
    cart: CartReducer,
    // order
    order: OrderReducer,
    //blog
    blog: BlogReducer,
  },
});
