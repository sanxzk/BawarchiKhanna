import React from "react";
import "./CategoryItems.css";
import { useNavigate } from "react-router-dom";

const CategoryItems = ({item}) => {
  const navigate = useNavigate();

  const goToRecipe=()=>{
        navigate(`/recipePage/?id=${item.idMeal}`);
  }
  
   
  return (
    <div className="category-items-cards">
      <img src={item.strMealThumb} alt={item.strMeal} />
      <p>{item.strMeal}</p>
      <button className="red-button" onClick={goToRecipe}>View recipe</button>
      <button className="red-button" onClick={goToRecipe}>Save recipe</button>
    </div>
  );
};

export default CategoryItems;
