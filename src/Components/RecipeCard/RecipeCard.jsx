import React, { useEffect, useState } from "react";
import "./RecipeCard.css";
import { Receipt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSavedRecipes, removeSavedRecipes } from "../../Store/CategoryFoodSlice";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SaveRecipes = useSelector((state) => state.CategorySlice.SaveRecipes);

  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    for (let i = 0; i < SaveRecipes.length; i++) {
      if (SaveRecipes[i].mealId === recipe.mealId) {
        setIsSaved(true);
        break;
      }
    }
  }, []);

  const saveRecipeHandler = () => {
    if (recipe !== null) {
      dispatch(addSavedRecipes(recipe));
    }
  };
  
  const removeRecipeHandler = () => {
    if (recipe !== null) {
      dispatch(removeSavedRecipes(recipe));
    }
  };

  return (
    <div className="recipecard-container">
      <img src={recipe.mealImg} />
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
          recipe
        </button>
        {isSaved ? (
          <button onClick={removeRecipeHandler}>Remove Recipe</button>
        ) : (
          <button onClick={saveRecipeHandler}>Save recipe</button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
