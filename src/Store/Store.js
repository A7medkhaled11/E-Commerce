import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice'
import darkmodeReducer from './Slices/darkmodeSlice'
import cartReducer from './Slices/cartSlice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        darkmode:darkmodeReducer ,
        cart: cartReducer

    }
});