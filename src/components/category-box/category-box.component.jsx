import { useNavigate } from 'react-router-dom';
import './category-box.styles.scss';

const CategoryBox = ({ category }) => {
   const { title, id, imageUrl, path } = category;
   const navigate = useNavigate();
   const navigateHandler = () => navigate(path);

   return (
      <div key={id} className='category-box' onClick={navigateHandler}>
         <div className='box-background' style={{ backgroundImage: `url(${imageUrl}})` }}></div>
         <div className='info'>
            <h2>{title}</h2>
            <p>Shop Now</p>
         </div>
      </div>
   );
};

export default CategoryBox;