import React, { useEffect, useState } from 'react';
import './RandomRecipe.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomItem } from '../../Store/CategoryFoodSlice';
import { useNavigate } from 'react-router-dom';

const RandomRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RandomRecipe = useSelector((state) => state.CategorySlice.RandomRecipe);
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(getRandomItem());
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 7000);
    return () => clearTimeout(timer);
  }, [dispatch, count]);

  if (RandomRecipe === null) return null;

  // Function to truncate description
  // const truncateDescription = (description, wordLimit) => {
  //   if (typeof description !== 'string') return '';  

  //   const words = description.split(' ');
  //   if (words.length <= wordLimit) return description;
  //   return words.slice(0, wordLimit).join(' ') + '...';
  // };

  // console.log(RandomRecipe.strInstructions);  

  return (
    <div className='home-auto-value'>
      {/* <ArrowBackIosIcon/> */}
      <img src={RandomRecipe.strMealThumb} alt={RandomRecipe.strMeal} className='home-paneer-img'/>
      <div className='home-desc'>
        <h1>{RandomRecipe.strMeal}</h1>
        {/* <span>{truncateDescription(RandomRecipe.strInstructions || '', 20)}</span> */}
        <button className='red-button' onClick={() => {
          navigate(`/recipePage/?id=${RandomRecipe.idMeal}`);
        }}>See more</button>
      </div>
      {/* <ArrowForwardIosIcon/> */}
    </div>
  );
};

export default RandomRecipe
