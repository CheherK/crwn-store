import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
   categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
   //insert data on our database
   // useEffect(() => {
   //    addCollectionAndDocuments("categories", Categories);
   // }, []);

   useEffect(() => {
      const getCategoriesMap = async () => {
         const categoryMap = await getCategoriesAndDocuments('categories');
         setCategoriesMap(categoryMap);
      };

      getCategoriesMap();
   }, []);

   const [categoriesMap, setCategoriesMap] = useState({});
   const value = { categoriesMap };

   return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};