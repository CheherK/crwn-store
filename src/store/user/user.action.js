import { createAction } from "../../utils/reducer/reducer.utils";
import { STATE_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => 
   createAction(STATE_ACTION_TYPES.SET_CURRENT_USER, user);