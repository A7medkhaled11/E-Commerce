import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'userSlice',

    initialState : {
        userInfo:null,
        role:null ,
        isLoggIn: false
    } ,
    reducers:{
        setUser: (state , action)=>{
            const {user , role} =action.payload;
            state.userInfo = user ;
            state.role=role;
            state.isLoggIn=true ;
                       
        } ,
        cleaUser: (state)=>{
            state.userInfo=null;
            state.isLoggIn=false;
            state.role=null;
        }
    }
});
export const {setUser , cleaUser} = userSlice.actions;
export default userSlice.reducer ;