import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/ProductSlice";
// import userSlice from "./slice/userSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:productSlice.reducer,
        cart:cartSlice.reducer,
        checkout:checkoutSlice.reducer,
        order:orderSlice.reducer,
    }
})