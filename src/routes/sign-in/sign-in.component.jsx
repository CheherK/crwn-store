import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {

   const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
   }

   return (
      <div>
         <h1>this is sign-in page</h1>
         <button onClick={logGoogleUser}>sign with google Popup</button>
         <SignUpForm />
      </div>
   )
}
   

export default SignIn;