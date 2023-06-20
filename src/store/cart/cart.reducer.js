import { CART_ACTION_TYPES } from "./cart.types";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_CART_STATE = {
   isCartOpen: false,
   cartItems: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState: INITIAL_CART_STATE,
   reducers: {
      setIsCartOpen(state, action) {
         state.isCartOpen = action.payload;
      },
      addItemToCart(state, action) {
         const cartItems = state.cartItems;
         const productToAdd = action.payload;
         const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === productToAdd.id
         );
         console.log(existingCartItem);
         if (existingCartItem) {
            const newCartItems = cartItems.map((cartItem) =>
               cartItem.id === productToAdd.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
            );
            state.cartItems = newCartItems;
         } else {
            const newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
            state.cartItems = newCartItems;
         }
      },
      decrementCartItem(state, action) {
         const cartItems = state.cartItems;
         const itemToDecrement = action.payload;
         if (itemToDecrement.quantity !== 1) {
            const newCartItems = cartItems.map((cartItem) =>
               cartItem.id === itemToDecrement.id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
            );
            state.cartItems = newCartItems;
         } else {
            const newCartItems = cartItems.filter((cartItem) =>
               cartItem.id !== itemToDecrement.id
            );
            state.cartItems = newCartItems;
         }
      },
      removeCartItem(state, action) {
         const newCartItems = state.cartItems.filter((cartItem) =>
            cartItem.id !== action.payload.id
         );
         state.cartItems = newCartItems;
      }
   }
});

export const { setIsCartOpen, addItemToCart, decrementCartItem, removeCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


// export const cartReducer = (state = INITIAL_CART_STATE, action = {}) => {

//    const { type, payload } = action;

//    switch (type) {
//       case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//          return {
//             ...state,
//             isCartOpen: payload,
//          };
//       case CART_ACTION_TYPES.SET_CART_ITEMS:
//          return {
//             ...state,
//             cartItems: payload,
//          };
//       default:
//          return state;
//    }
// };