import React, { useEffect, useState } from "react";
import "./CategoryItems.css";
import { useNavigate } from "react-router-dom";
import {
  addSavedRecipes,
  removeSavedRecipes,
} from "../../Store/CategoryFoodSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const formatDate = (date) => {
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
 

const CategoryItems = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToRecipe = () => {
    navigate(`/recipePage/?id=${item.idMeal}`);
  };

  const SaveRecipes = useSelector((state) => state.CategorySlice.SaveRecipes);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const isRecipeSaved = SaveRecipes.some(
      (savedRecipe) => savedRecipe.mealId === item.idMeal
    );
    setIsSaved(isRecipeSaved);
  }, [SaveRecipes, item.idMeal]);

  const saveRecipeHandler = () => {
    if (item !== null) {
      const recipe = {
        mealTitle: item.strMeal,
        mealImg: item.strMealThumb,
        mealId: item.idMeal,
        mealDate: formatDate(Date()),
      };
      dispatch(addSavedRecipes(recipe));
      toast.success("Recipe saved successfully");
      setIsSaved(true);
    }
  };

  const removeRecipeHandler = () => {
    if (item !== null) {
      const recipe = {
        mealTitle: item.strMeal,
        mealImg: item.strMealThumb,
        mealId: item.idMeal,
        mealDate: formatDate(Date()),
      };
      dispatch(removeSavedRecipes(recipe));
      toast.error("Recipe removed");
      setIsSaved(false);
    }
  };

  return (
    <div className="category-items-cards">
      <img src={item.strMealThumb} alt={item.strMeal} />
      <p>{item.strMeal}</p>
      <button className="red-button" onClick={goToRecipe}>
        View recipe
      </button>
      {isSaved ? (
        <button className="red-button" onClick={removeRecipeHandler}>
          remove recipe
        </button>
      ) : (
        <button className="red-button" onClick={saveRecipeHandler}>
          Save recipe
        </button>
      )}
    </div>
  );
};

export default CategoryItems;
