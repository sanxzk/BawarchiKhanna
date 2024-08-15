import React, { useEffect, useState } from "react";
import "./RecipeHistory.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import recipedata from "./Data.json";
import { useSelector } from "react-redux";

const RecipeHistory = () => {
   const meals = useSelector((state)=>state.CategorySlice.HistoryData);

  return (
    <div className="show-all">
      <h2>Previously Viewed Items</h2>
      <div className="recipehistory-container">
      
        {meals.map((recipe) => {
          return <RecipeCard recipe={recipe} />;
        })}

      </div>
    </div>
  );
};

export default RecipeHistory;
