import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{shippingAddress: sessionStorage.getItem("shipping")?JSON.parse(sessionStorage.getItem("shipping")):{}},
    reducers:{
        store_shipping_address(state,action){
            state.shippingAddress=action.payload
            sessionStorage.setItem("shipping",JSON.stringify(state.shippingAddress))
        } 
    }
})
export const {store_shipping_address}=checkoutSlice.actions
export default checkoutSlice
export const selectShippingAddress=state=>state.checkout.shippingAddress