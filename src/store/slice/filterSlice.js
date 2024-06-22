import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:'filter',
    initialState:{filterproducts:[],s:""},
    reducers:{
        // which data want to send 
        FILTER_BY_SEARCH(state,action){
            let {search,products}=action.payload
            let tempproduct =products.filter((product)=>product.name.includes(search) || product.category.includes(search) || product.brand.includes(search) || product.price.includes(search))
            state.filterproducts=tempproduct
            state.s=search
        }
    }
})
export const {FILTER_BY_SEARCH} =filterSlice.actions
export default filterSlice
export const selectfilterProducts=state=>state.filter.filterproducts
export const selectsearch=state=>state.filter.s