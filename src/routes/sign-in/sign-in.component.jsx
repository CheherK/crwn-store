import { singInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

   const logGoogleUser = async () => {
      const {user} = await singInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
   }

   return (
      <div>
         <h1>this is sign-in page</h1>
         <button onClick={logGoogleUser}>sign with google</button>
      </div>
   )
}
   

export default SignIn;