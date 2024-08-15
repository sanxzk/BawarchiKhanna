import React, { useEffect, useState } from "react";
import "./RecipePage.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddHistory,
  addSavedRecipes,
  fetchRecipesById,
  removeSavedRecipes,
} from "../../Store/CategoryFoodSlice";

const formatDate = (date) => {
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const RecipePage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");

  const recipe = useSelector((state) => state.CategorySlice.currMeal);
  const SaveRecipes = useSelector((state) => state.CategorySlice.SaveRecipes);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipesById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (recipe !== null) {
      const historyElem = {
        mealTitle: recipe.strMeal,
        mealImg: recipe.strMealThumb,
        mealId: id,
        mealDate: formatDate(Date()),
      };
      dispatch(AddHistory(historyElem));
    }
  }, [recipe, dispatch]);

  useEffect(() => {
    setIsSaved(SaveRecipes.some((savedRecipe) => savedRecipe.mealId === id));
  }, [SaveRecipes, id]);

  const saveRecipeHandler = () => {
    if (recipe !== null) {
      const savedElem = {
        mealTitle: recipe.strMeal,
        mealImg: recipe.strMealThumb,
        mealId: id,
        mealDate: formatDate(Date()),
      };
      dispatch(addSavedRecipes(savedElem));
    }
  };

  const removeRecipeHandler = () => {
    if (recipe !== null) {
      const savedElem = {
        mealTitle: recipe.strMeal,
        mealImg: recipe.strMealThumb,
        mealId: id,
        mealDate: formatDate(Date()),
      };
      dispatch(removeSavedRecipes(savedElem));
    }
  };

  const toggleShowAllIngredients = () => {
    setShowAllIngredients(!showAllIngredients);
  };

  if (!recipe) return <h1>Recipe not found</h1>;

  return (
    <div className="recipe-page">
      <h1 className="recipe-heading">{recipe.strMeal}</h1>
      <div className="recipe-content">
        <div className="recipe-img-ingredient-container">
          <img
            src={recipe.strMealThumb}
            className="recipe-img"
            alt={recipe.strMeal}
          />
          <div className="ingredients-section">
            <h2>Ingredients</h2>
            <div className="ingredients-table">
              <tbody>
                {recipe.ingredients
                  .slice(0, showAllIngredients ? recipe.ingredients.length : 5)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.strIngredient}</td>
                      <td>{item.strMeasure}</td>
                    </tr>
                  ))}
              </tbody>
            </div>
            {!showAllIngredients && recipe.ingredients.length > 5 && (
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={toggleShowAllIngredients}
                  className="see-more-btn"
                >
                  See More
                </button>
              </div>
            )}
            {isSaved ? (
              <button onClick={removeRecipeHandler} className="see-more-btn">
                Remove recipe
              </button>
            ) : (
              <button onClick={saveRecipeHandler} className="see-more-btn">
                Save recipe
              </button>
            )}
          </div>
          {showAllIngredients && (
            <div className="overlay" onClick={toggleShowAllIngredients}>
              <div
                className="all-ingredients"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>All Ingredients</h2>
                <table className="ingredients-table">
                  <tbody>
                    {recipe.ingredients.map((item, index) => (
                      <tr key={index}>
                        <td>{item.strIngredient}</td>
                        <td>{item.strMeasure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="instructions-section">
        <h2>Instruction</h2>
        <ol>
          {recipe.strInstructions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
