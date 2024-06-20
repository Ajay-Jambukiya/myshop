import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:'order',
    initialState:{orders:[]},
    reducers:{
        store_order(state,action){
            state.orders=action.payload.orders
        }
    }
})
export const {store_order } =orderSlice.actions
export default orderSlice
export const selectOrders=state=>state.order.orders