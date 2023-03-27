import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
   const toggleIsOpen = () => setIsCartOpen(!isCartOpen);
   
   return (
      <div className="cart-icon-container" onClick={toggleIsOpen}>
         <ShoppingIcon className="shopping-icon" />
         <span className="item-count">{cartCount}</span>
      </div>
   )
}

export default CartIcon;