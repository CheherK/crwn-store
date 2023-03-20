import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,
signInWithEmailAndPassword } from "firebase/auth";
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


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: "select_account"
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); // point to the firestore data base

export const createUserDocumentFromAuth = async (userAuth, additionalInformations = {}) => {
   if (!userAuth) return;
   //doc(database, collection, identifier) : return a document reference
   const userDocRef = doc(db, 'users', userAuth.uid);

   //get the data related to the document => actually it allows us to check if this user exists in databse or not and access the data.
   const userSnapshot = await getDoc(userDocRef);

   //if there is no instance we create one.
   if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformations
         });
      } catch(error) {
         console.log('error created the user : ', error.message);
      }
   }
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if(!email || !password) return;
   return await createUserWithEmailAndPassword( auth, email, password)
}
export const signInUserWithEmailAndPassword = async(email, password) => {
   if(!email || !password) return;
   return await signInWithEmailAndPassword(auth, email, password);
};