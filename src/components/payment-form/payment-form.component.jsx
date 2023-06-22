import { useState } from 'react';
import { CardElement, useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import "./payment-form.styles.scss";


const PaymentForm = () => {
   const stripe = useStripe();
   const elements = useElements();
   const amount = useSelector(selectCartTotal);
   const currentUser = useSelector(selectCurrentUser);
   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

   const paymentHandler = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      try {
         setIsProcessingPayment(true);
         const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
         }).then((res) => {
            return res.json();
         });

         const clientSecret = response.paymentIntent.client_secret;

         const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                  name: currentUser ? currentUser.displayName : 'Guest',
                  ...(await elements.getElement('address')?.getValue()).value,
               },
            },
         });

         setIsProcessingPayment(false);

         if (paymentResult.error) {
            alert(paymentResult.error.message);
         } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
               alert('Payment Successful!');
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className='payment-form-container'>
         <form className='form-container' onSubmit={paymentHandler}>
            <h2>Client Information :</h2>
            <AddressElement options={{ mode: 'shipping' }} />
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <Button
               buttonType={BUTTON_TYPES_CLASSES.inverted}
               isLoading={isProcessingPayment}
            >
               Pay Now
            </Button>
         </form>
      </div>
   );
};
export default PaymentForm;