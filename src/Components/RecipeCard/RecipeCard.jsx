import React, { useEffect, useState } from "react";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSavedRecipes, removeSavedRecipes } from "../../Store/CategoryFoodSlice";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SaveRecipes = useSelector((state) => state.CategorySlice.SaveRecipes);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const isRecipeSaved = SaveRecipes.some(savedRecipe => savedRecipe.mealId === recipe.mealId);
    setIsSaved(isRecipeSaved);
  }, [SaveRecipes, recipe.mealId]);

  const saveRecipeHandler = () => {
    if (recipe !== null) {
      dispatch(addSavedRecipes(recipe));
      toast.success('Recipe saved successfully');
      setIsSaved(true);
    }
  };

  const removeRecipeHandler = () => {
    if (recipe !== null) {
      dispatch(removeSavedRecipes(recipe));
      toast.error('Recipe removed');
      setIsSaved(false);
    }
  };

  return (
    <div className="recipecard-container">
      <img src={recipe.mealImg} alt={recipe.mealTitle} />
      <div className="recipecard-name">
        <h4>{recipe.mealTitle}</h4>
      </div>
      <div className="recipecard-button">
        <p>
          <i>last Viewed {recipe.mealDate}</i>
        </p>
        <button
          onClick={() => {
            navigate(`/recipePage?id=${recipe.mealId}`);
          }}
        >
          Recipe
        </button>
        {isSaved ? (
          <button onClick={removeRecipeHandler}>Remove Recipe</button>
        ) : (
          <button onClick={saveRecipeHandler}>Save Recipe</button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
