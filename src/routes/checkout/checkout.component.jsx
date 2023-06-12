import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
   const cartItems = useSelector(selectCartItems);
   const cartTotal = useSelector(selectCartTotal);
   //[]
   return (
      <div className="checkout-container">
         <header>
            <span>Product</span>
            <span>Description</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>remove</span>
         </header>
         
         {cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)}
         <span className="total">Total: {cartTotal} $</span>
      </div>
   );
};

export default Checkout;