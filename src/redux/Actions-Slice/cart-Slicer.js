import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartCount : 0,
   
}
 
const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
             state.cartItems.push(action.payload);
             state.cartCount = state.cartItems.length;
        },
        removeFromCart(state, action) {
            const index = state.cartItems.findIndex(object => {
                return object.id === action.payload.id;
            })
            state.cartItems.splice(index, 1);

            state.cartCount = state.cartItems.length;
        }
    }
});
export const { addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
