import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";  
const cartSlice = createSlice({
    name:'cartSlice' ,
    initialState : {
        cartItems:  JSON.parse(localStorage.getItem('cartItems'))||[] ,
        totalAmount : JSON.parse(localStorage.getItem('totalAmount')) || 0
    },
    reducers:{
        addFromApi:(state,action)=>{
            const item = action.payload;
            const findItem = state.cartItems.find((product)=>item.id==product.id);
            if(!findItem){state.cartItems.push(item);
              
                  cartSlice.caseReducers.calcTotal(state);}
               
               }
        ,
        
        addToCart : (state,action)=>{
               const item = action.payload;
               const findItem = state.cartItems.find((product)=>item.id==product.id);
               if(findItem){
                findItem.quantity++;
                toast.success(`You Add This Product: ${findItem.quantity} Times`);
               }else{
                state.cartItems.push({...item,quantity:1});
                toast.success("Product Added!");
               }
               cartSlice.caseReducers.calcTotal(state);
               localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));
               
        } ,
        removeFromCart:(state,action)=>{
            const id = action.payload ;
            const findItem = state.cartItems.find((item)=>item.id==id);
            if(findItem) {state.cartItems= state.cartItems.filter(item=>item.id!=id)
                toast.success("Product deleted!");
            };
            cartSlice.caseReducers.calcTotal(state);
              localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));


        },
        decreaseQty:(state,action)=>{
              const id = action.payload ;
            const findItem = state.cartItems.find((item)=>item.id==id);
            if(findItem && findItem.quantity>1) findItem.quantity--;
             cartSlice.caseReducers.calcTotal(state);
            localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));



        },
        increaseQty:(state,action)=>{
             const id = action.payload ;
            const findItem = state.cartItems.find((item)=>item.id==id);
            if(findItem ) findItem.quantity++;
                        cartSlice.caseReducers.calcTotal(state);
                                       localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));

        },
        clearCart:(state)=>{
            state.cartItems=[];
            state.totalAmount=0;
            localStorage.removeItem('cartItems');
                        localStorage.removeItem('totalAmount');



        } ,
        calcTotal:(state)=>{
        state.totalAmount= state.cartItems.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
        localStorage.setItem('totalAmount' , state.totalAmount);
        }
    }
})

export const {addToCart , addFromApi, removeFromCart , decreaseQty , increaseQty ,calcTotal ,clearCart} = cartSlice.actions;
export default cartSlice.reducer ;
