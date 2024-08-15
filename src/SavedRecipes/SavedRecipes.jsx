import React from 'react';
import './SavedRecipes.css';
import { useSelector } from 'react-redux';
import RecipeCard from '../Components/RecipeCard/RecipeCard';

const SavedRecipes = () => {
  const meals = useSelector((state)=>state.CategorySlice.SaveRecipes);
 
   return (
     <div className="show-all">
       <h2>View Saved Items</h2>
       <div className="saved-recipes-container">
       
         {meals.map((recipe) => {
           return <RecipeCard recipe={recipe} />;
         })}
 
       </div>
     </div>
   );
 };

export default SavedRecipes;
