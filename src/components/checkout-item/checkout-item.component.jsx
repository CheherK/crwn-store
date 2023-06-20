import { useDispatch } from "react-redux";
// import { selectCartItems } from "../../store/cart/cart.selector";
import { removeCartItem, addItemToCart, decrementCartItem } from "../../store/cart/cart.reducer";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
   const { name, imageUrl, quantity, price } = cartItem;
   const dispatch = useDispatch();

   /*
      When you pass removeItemFromCart(cartItem) directly to the onClick handler, 
      it means that this function will be executed immediately when the component is rendered. 
      that's why we use other function as a reference:

      const removeHandler = () => removeItemFromCart(cartItem);
      <span onClick={removeHandler}>x</span>

      The function is not executed until the user clicks on the span element.


      <span onClick={removeItemFromCart(cartItem)}>x</span>
      The function is executed immediately when the component is rendered, and the result of the function (which is probably undefined) is passed as the onClick handler. This means that every time the component is rendered, the function is executed again, causing an infinite loop.
   */

   const decrementHandler = () => dispatch(decrementCartItem(cartItem));
   const incrementHandler = () => dispatch(addItemToCart(cartItem));
   const removeHandler = () => dispatch(removeCartItem(cartItem));
   return (
      <div className='checkout-item-container'>
         <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
         </div>
         <span className='name'> {name} </span>
         <span className='quantity'>
            <div className='arrow' onClick={decrementHandler}>
               &#10094;
            </div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={incrementHandler}>
               &#10095;
            </div>
         </span>
         <span className='price'> {price}</span>
         <div className='remove-button' onClick={removeHandler}>
            &#10005;
         </div>
      </div>
   );
};

export default CheckoutItem;