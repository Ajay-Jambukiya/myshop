import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'product',
    initialState:{products:[]},
    reducers:{
        store_product(state,action){
            state.products=action.payload.products
        }
    }
})
export const {store_product} =productSlice.actions
export default productSlice
export const selectProducts=state=>state.product.products