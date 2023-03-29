import { createContext, useState, useEffect } from 'react';

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

   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);
   const [cartTotal, setCartTotal] = useState(0);

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity,
         0
      );
      setCartCount(newCartCount);
   }, [cartItems]);

   useEffect(() => {
      const newCartTotal = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity * cartItem.price,
         0
      );
      setCartTotal(newCartTotal);
   }, [cartItems]);

   const addItemToCart = (itemToAdd) =>
      setCartItems(addCartItem(cartItems, itemToAdd));

   const decrementItemFromCart = (cartItemToDec) =>
      setCartItems(decrementCartItem(cartItems, cartItemToDec));

   const removeItemFromCart = (cartItemToRemove) =>
      setCartItems(removeCartItem(cartItems, cartItemToRemove));

   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, decrementItemFromCart, removeItemFromCart, cartCount, cartTotal };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};