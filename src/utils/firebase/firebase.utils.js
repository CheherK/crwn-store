import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

const firebaseConfig = {
   apiKey: "AIzaSyA9Q7UKF5j0udrLiXLr35-ivx5p5x_nXQA",
   authDomain: "crwn-clothing-db-f9a2b.firebaseapp.com",
   projectId: "crwn-clothing-db-f9a2b",
   storageBucket: "crwn-clothing-db-f9a2b.appspot.com",
   messagingSenderId: "530174912569",
   appId: "1:530174912569:web:e3551cd26a9be91bd1c5e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: "select_account"
});
export const auth = getAuth(app);
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore(); // point to the firestore data base

export const createUserDocumentFromAuth = async (userAuth) => {
   //doc(database, collection, identifier) : return a document reference
   const userDocRef = doc(db, 'users', userAuth.uid);
   console.log(userDocRef);
   //get the data related to the document => actually it allows us to check if this user exists in databse or not and access the data.
   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   //if there is no instance we create one.
   if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
         });
      } catch(error) {
         console.log('error created the user : ', error.message);
      }
   }
}