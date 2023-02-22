import './category-box.styles.scss';

const CategoryBox = ({category: {title, id, imageUrl}}) => 
   <div key={id} className='category-box'>
      <div className='box-background' style={{backgroundImage: `url(${imageUrl}})`}}></div>
      <div className='info'>
         <h2>{title}</h2>
         <p>Shop Now</p>
      </div>
   </div>

export default CategoryBox;