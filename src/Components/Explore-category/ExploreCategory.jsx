import React from 'react'
import './ExploreCategory.css';
import { useNavigate } from 'react-router-dom';


const ExploreCategory = () => {
     
  const navigate = useNavigate();

  return (
    <div onClick={()=>{navigate('/categorypage')}} className='explore-category-details'>
      <h2>&emsp;&emsp;Cooking Made Easy: Discover Recipes Sorted for You!</h2>
      <button className='red-button'>Explore Now &#8594;</button>
    </div>
  );
};

export default ExploreCategory;
