import { createContext, useReducer } from 'react';

const CART_ACTION_TYPES = {
   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
   SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
   isCartOpen: false,
   cartItems: [],
   cartCount: 0,
   cartTotal: 0,
};

const cartReducer = (state, action) => {
   const { type, payload } = action;

   switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
         return {
            ...state,
            ...payload,
         };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
         return {
            ...state,
            isCartOpen: payload,
         };
      default:
         throw new Error(`Unhandled type ${type} in cartReducer`);
   }
};

const addCartItem = (cartItems, productToAdd) => {
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
   );

   if (existingCartItem) {
      return cartItems.map((cartItem) =>
         cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
      );
   }

   return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementCartItem = (cartItems, itemToDecrement) => {
   if (itemToDecrement.quantity !== 1) {
      return cartItems.map((cartItem) =>
         cartItem.id === itemToDecrement.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
      );
   } else {
      return cartItems.filter((cartItem) =>
         cartItem.id !== itemToDecrement.id
      );
   }
};

const removeCartItem = (cartItems, ItemToRemove) => {
   return cartItems.filter((cartItem) =>
      cartItem.id !== ItemToRemove.id
   );
};

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => { },
   cartItems: [],
   addItemToCart: () => { },
   decrementItemFromCart: () => { },
   removeItemFromCart: () => { },
   cartCount: 0,
   cartTotal: 0,
});

export const CartProvider = ({ children }) => {

   

   const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

   const updateCartItemsReducer = (newCartItems) => {
      //Cart Count
      const newCartCount = newCartItems.reduce(
         (total, cartItem) => total + cartItem.quantity,
         0
      );
      //Cart Total
      const newCartTotal = newCartItems.reduce(
         (total, cartItem) => total + cartItem.quantity * cartItem.price,
         0
      );

      dispatch({
         type: CART_ACTION_TYPES.SET_CART_ITEMS,
         payload: {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
         }
      });
   };

   const addItemToCart = (itemToAdd) => {
      const newCartItems = addCartItem(cartItems, itemToAdd);
      updateCartItemsReducer(newCartItems);
   };

   const decrementItemFromCart = (cartItemToDec) => {
      const newCartItems = decrementCartItem(cartItems, cartItemToDec);
      updateCartItemsReducer(newCartItems);
   };

   const removeItemFromCart = (cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove);
      updateCartItemsReducer(newCartItems);
   };

   const setIsCartOpen = (bool) => {
      dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
   };

   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, decrementItemFromCart, removeItemFromCart, cartCount, cartTotal };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};