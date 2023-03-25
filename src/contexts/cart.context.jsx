import { createContext, useState } from "react";

export const CartContext = createContext({
   products: [],
   setProduct: () => null,
   isOpen: false,
   setIsOpen: () => null,
});

export const CartProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [products, setProducts] = useState([]);
   const value = { isOpen, setIsOpen, products, setProducts };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};