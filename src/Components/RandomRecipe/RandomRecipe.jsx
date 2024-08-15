import React, { useEffect, useState } from 'react'
import paneerimg from '../../assets/paneerimg.jpg'
import './RandomRecipe.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomItem } from '../../Store/CategoryFoodSlice';
import { useNavigate } from 'react-router-dom';

const  RandomRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RandomRecipe = useSelector((state)=>state.CategorySlice.RandomRecipe)
  
  const [count, setCount] = useState(0);

  useEffect(()=>{
    dispatch(getRandomItem());
    setTimeout(()=>{
         setCount(count+1);
    },7000)
  },[dispatch,count]);

if(RandomRecipe === null) return null;
  return (
    <div className='home-auto-value'>
         <ArrowBackIosIcon/> <img src={RandomRecipe.strMealThumb} alt={RandomRecipe.strMeal} className='home-paneer-img'/>
        <div className = "home-desc">
            <h1>{RandomRecipe.strMeal}</h1>
            <span>{RandomRecipe.strInstructions[0]}</span>
            <button className='red-button' onClick={()=>{
              navigate(`/recipePage/?id=${RandomRecipe.idMeal}`)
            }}>see more</button>
        </div>
        <ArrowForwardIosIcon/>
    </div>
  )
}

export default  RandomRecipe
