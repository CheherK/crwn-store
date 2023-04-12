import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

const STATE_ACTION_TYPES = {
   SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_USER_STATE = {
   currentUser: null,
};

//as the actual value you want to access
export const UserContext = createContext({
   currentUser: null,
   setCurrentUser: () => null,
});

const userReducer = (state, action) => {

   const { type, payload } = action;

   switch (type) {
      case STATE_ACTION_TYPES.SET_CURRENT_USER:
         return {
            ...state,
            currentuser: payload,
         };
      default:
         throw new Error(`Unhandled type ${type} in userReducer`);
   }
};

export const UserProvider = ({ children }) => {
   const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);

   const setCurrentUser = (user) => {
      dispatch({ type: STATE_ACTION_TYPES.SET_CURRENT_USER, payload: user });
   };

   const value = { currentUser, setCurrentUser };

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
         if (user) {
            createUserDocumentFromAuth(user);
         }
         setCurrentUser(user);
      });

      return unsubscribe;
   }, []);

   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};