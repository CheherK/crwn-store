// import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const CATEGORIES_INITIAL_STATE = {
   categories: [],
   isLoading: false,
   error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
   try {
      const response = await getCategoriesAndDocuments();
      console.log(response);
      return response;
   } catch (error) {
      return error.message;
   }
});

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState: CATEGORIES_INITIAL_STATE,
   extraReducers(builder) {
      builder
         .addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
         })
         .addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
   }
});

export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducerOld = (
//    state = CATEGORIES_INITIAL_STATE,
//    action = {}
// ) => {
//    const { type, payload } = action;

//    switch (type) {
//       case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//          return {
//             ...state,
//             isLoading: true,
//          };
//       case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//          return { ...state, isLoading: false, categories: payload };
//       case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//          return { ...state, isLoading: false, error: payload };
//       default:
//          return state;
//    }
// };