import { createSlice } from "@reduxjs/toolkit";

const darkmodeSlice = createSlice({
    name:'darkmodeSlice' , 
    initialState:{
        isDark:JSON.parse(localStorage.getItem('isDark'))||false
    },
    reducers:{
        setDark:(state)=>{
            state.isDark=true;
            localStorage.setItem('isDark',true);
        },
        clearDark:(state)=>{
            state.isDark=false
           localStorage.setItem('isDark',false);

        }
    }
})
export const {setDark , clearDark} = darkmodeSlice.actions; 
export default darkmodeSlice.reducer;