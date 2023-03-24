import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
};

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields;
   console.log('hit from sign up');

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   };

   const submitHandler = async (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
         alert("password does not match");
         return;
      }
      try {
         const { user } = await createAuthUserWithEmailAndPassword(email, password);
         await createUserDocumentFromAuth(user, { displayName });
         resetFormFields();
      } catch (error) {
         if (error.code === "auth/email-already-in-use") {
            alert("email already used!");
         } else {
            console.log('error created the user : ', error.message);
         }
      }
   };

   const changeHandle = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };
   return (
      <section className='sign-up-form'>
         <h2>Don't have an account?</h2>
         <span>Sign up with your email and password.</span>
         <form onSubmit={submitHandler}>
            <FormInput label="Name" type='text' required onChange={changeHandle} name='displayName' value={displayName} />
            <FormInput label="Email" type='email' required onChange={changeHandle} name='email' value={email} />
            <FormInput label="Password" type='password' required onChange={changeHandle} name='password' value={password} />
            <FormInput label="Confirm  Password" type='password' required onChange={changeHandle} name='confirmPassword' value={confirmPassword} />

            <Button type='submit'>Sign Up</Button>
         </form>
      </section>
   );
};

export default SignUpForm;