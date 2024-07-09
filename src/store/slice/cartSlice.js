import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
name:"cart",
initialState:{cartItems:localStorage.getItem("cartItems")
            ?
            JSON.parse(localStorage.getItem("cartItems"))
            :
            [],cartTotalAmount:localStorage.getItem("total") ? localStorage.getItem("total") : 0,
            cartTotalQuantity:0,previousURL:""},
reducers:{
    ADD_TO_CART(state,action){
        console.log(action.payload)
        const productIndex=state.cartItems.findIndex((item)=>item.id === action.payload.id)
        if(productIndex != -1){
            // increase qty
            if( state.cartItems[productIndex].cartQuantity < state.cartItems[productIndex].countInStock){
            state.cartItems[productIndex].cartQuantity +=1
            toast.success(`${action.payload.name} quantity increased by 1`)
            }
            else {
                toast.info(`${action.payload.name} ${action.payload.countInStock} qty available`)
            }
        }
        else {
            // add to cart
            state.cartItems.push({...action.payload , cartQuantity:1})
            toast.success(`${action.payload.name} added to cart`)
        }
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    DECREASE(state,action){
        const productIndex=state.cartItems.findIndex((item)=>item.id === action.payload.id)
        if(productIndex != -1){
            // increase qty
            if( state.cartItems[productIndex].cartQuantity > 1){
            state.cartItems[productIndex].cartQuantity -=1
            toast.success(`${action.payload.name} quantity decreased by 1`)
            }
            else {
                state.cartItems[productIndex].cartQuantity =1
            }
        }
    },
    REMOVE_FROM_CART(state,action){
        state.cartItems.splice(action.payload,1)
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems)) 
    },
    EMPTY_CART(state,action){
        state.cartItems=[]
        state.cartTotalAmount=0
        state.cartTotalQuantity=0
        localStorage.removeItem('cartItems')
    },
    CALCULATE_SUBTOTAL(state,action){
        let result=state.cartItems.reduce((prev,item)=>{
            return prev + (parseInt(item.price) * parseInt(item.cartQuantity))
        },0)
        state.cartTotalAmount=result
        localStorage.setItem('total',state.cartTotalAmount) 
    },
    // CALCULATE_TOTALQUANTITY(state,action){
    //     let count=state.cartItems.reduce((prev,item)=>{
    //         return prev + (parseInt(item.cartQuantity))
    //     })
    //     state.cartTotalQuantity=count
    // },
    SAVE_URL(state,action){
        state.previousURL=action.payload
    }
}
})
export const{ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_SUBTOTAL,CALCULATE_TOTALQUANTITY,SAVE_URL}=cartSlice.actions
export default cartSlice
export const selectCartItems=(state)=>state.cart.cartItems
export const selectTotalAmount=(state)=>state.cart.cartTotalAmount
// export const selectTotalQuantity=(state)=>state.cart.cartTotalQuantity
export const selectPreviousURL=(state)=>state.cart.previousURL
