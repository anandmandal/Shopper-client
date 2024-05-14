import { configureStore } from "@reduxjs/toolkit";
import cartSlicer from "./Actions-Slice/cart-Slicer";

export default configureStore({
    reducer: {
        store:cartSlicer      //initial state[cartItems,count],actions
    }
})