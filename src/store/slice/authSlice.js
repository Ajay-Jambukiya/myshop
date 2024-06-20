import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{isLoggedIn:null,email:null,userName:null,userId:null,role:null},
    reducers:{
        LoginUser(state,action){
            let {email,userName,userId,role}=action.payload
            state.isLoggedIn=true
            state.email=email
            state.userName=userName
            state.userId=userId
            state.role=role
            // console.log(state.isLoggedIn)
        },
        LogoutUser(state,action){
            state.isLoggedIn=false
            state.email=null
            state.userName=null
            state.userId=null
            state.role=null
            // console.log(state.isLoggedIn)
        }
    }
})
export const {LoginUser,LogoutUser}=authSlice.actions
export default authSlice
export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectEmail=state=>state.auth.email
export const selectUserName=state=>state.auth.userName
export const selectUserId=state=>state.auth.userId
export const selectUserRole=state=>state.auth.role
// select vala name kai pan rakhi sakay