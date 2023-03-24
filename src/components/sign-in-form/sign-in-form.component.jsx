import { useContext, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import { signInUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
   email: '',
   password: '',
};

const SignInForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;

   const submitHandler = async (event) => {
      event.preventDefault();
      try {
         await signInUserWithEmailAndPassword(email, password);
      } catch (error) {
         if(error.code === "auth/wrong-password") {
            
         } else if(error.code === "auth/user-not-found") {
            alert("wrong email")
         } else {
            
         }
         switch(error.code) {
            case "auth/wrong-password": alert("Wrong Password"); break;
            case "auth/user-not-found": alert("Wrong email"); break;
            default: console.log(error.code);
         }
      }
   };

   const changeHandle = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };

   const signInWithGoogle = async () => {
      await signInWithGooglePopup();
   };
   return (
      <section className='sign-in-form'>
         <h2>Already have an account?</h2>
         <span>sign in with your email and password</span>
         <form onSubmit={submitHandler}>
            <FormInput label="Email" type='email' required onChange={changeHandle} name='email' value={email} />
            <FormInput label="Password" type='password' required onChange={changeHandle} name='password' value={password} />
            <div className='buttons-container'>
               <Button type='submit'>Sign In</Button>
               <Button type='button' onClick={signInWithGoogle} buttonType='google'>google sign in</Button>
            </div>
         </form>
      </section>
   );
};

export default SignInForm;