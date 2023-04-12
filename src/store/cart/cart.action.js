import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

//set IsCartOpen
export const setIsCartOpen = (bool) =>
   createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


//add new item to the cart && increase the quantity of a cart item
export const addItemToCart = (cartItems, productToAdd) => {
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
   );

   if (existingCartItem) {
      const newCartItems = cartItems.map((cartItem) =>
         cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
      );
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
   }
   const newCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};


//decrement the quantity of an item from cart
export const decrementCartItem = (cartItems, itemToDecrement) => {
   if (itemToDecrement.quantity !== 1) {
      const newCartItems = cartItems.map((cartItem) =>
         cartItem.id === itemToDecrement.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
      );
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
   } else {
      const newCartItems = cartItems.filter((cartItem) =>
         cartItem.id !== itemToDecrement.id
      );
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
   }
};


//remove an item directly from the cart
export const removeCartItem = (cartItems, ItemToRemove) => {
   const newCartItems = cartItems.filter((cartItem) =>
      cartItem.id !== ItemToRemove.id
   );
   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};