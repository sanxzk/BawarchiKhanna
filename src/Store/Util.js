export function convertMealData(data) {
    // Extract the single meal object
    const meal = data.meals[0];
  
    // Split instructions by '\n' and trim any extra whitespace
    const instructionsArray = meal.strInstructions
      .split('\n')
      .map(instruction => instruction.trim())
      .filter(instruction => instruction.length > 0); // Remove any empty strings
  
    // Return the new format
    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strDrinkAlternate: meal.strDrinkAlternate,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: instructionsArray,
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube,
      ingredients: [
        { strIngredient: meal.strIngredient1, strMeasure: meal.strMeasure1 },
        { strIngredient: meal.strIngredient2, strMeasure: meal.strMeasure2 },
        { strIngredient: meal.strIngredient3, strMeasure: meal.strMeasure3 },
        { strIngredient: meal.strIngredient4, strMeasure: meal.strMeasure4 },
        { strIngredient: meal.strIngredient5, strMeasure: meal.strMeasure5 },
        { strIngredient: meal.strIngredient6, strMeasure: meal.strMeasure6 },
        { strIngredient: meal.strIngredient7, strMeasure: meal.strMeasure7 },
        { strIngredient: meal.strIngredient8, strMeasure: meal.strMeasure8 },
        { strIngredient: meal.strIngredient9, strMeasure: meal.strMeasure9 }
      ].filter(ingredient => ingredient.strIngredient) // Remove any undefined ingredients
    };
  }
  