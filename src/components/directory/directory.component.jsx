import './directory.styles.scss';
import CategoryBox from '../category-box/category-box.component';

const Directory = ({categories}) => 
   <div className='directory'> 
      {categories.map((category) => 
         <CategoryBox category={category} />
      )}
   </div>

   export default Directory