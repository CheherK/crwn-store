import { createSlice } from "@reduxjs/toolkit";
import { STATE_ACTION_TYPES } from "./user.types";

const INITIAL_USER_STATE = {
   currentUser: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState: INITIAL_USER_STATE,
   reducers: {
      setCurrentUser(state, action) {
         state.currentUser = action.payload;//under the hood redux toolkit use a library called immer to ensure that the is immutability
      }
   }
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducerOld = (state = INITIAL_USER_STATE, action) => {

//    const { type, payload } = action;

//    switch (type) {
//       case STATE_ACTION_TYPES.SET_CURRENT_USER:
//          return {
//             ...state,
//             currentUser: payload,
//          };
//       default:
//          return state;
//    }
// };