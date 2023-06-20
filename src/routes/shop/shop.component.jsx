import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategories } from '../../store/categories/categories.reducer';

const Shop = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchCategories());
   }, []);

   return (
      <Routes>
         <Route index element={<CategoriesPreview />} />
         <Route path=':category' element={<Category />} />
      </Routes>
   );
};

export default Shop;