import { selectCategoriesMap } from "../../store/categories/categories.selector";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
   const categoriesMap = useSelector(selectCategoriesMap);
   return (
      <>
         {categoriesMap && Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return <CategoryPreview key={title} title={title} products={products} />;
         })}
      </>
   );
};


export default CategoriesPreview; 