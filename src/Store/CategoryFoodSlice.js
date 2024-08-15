import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { convertMealData } from "./Util";

const initialState = {
  foodCategory: [],
  currStatus: "idle",
  categoryItems: [],
  itemsStatus: "idle",
  error: null,
  currMeal: null,
  searchedMeals: [],
  RandomRecipe: null,
  HistoryData: [],
  SaveRecipes:[],
};

export const fetchFoodCategories = createAsyncThunk(
  "foodCategories/fetchCategories",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCategoryItems = createAsyncThunk(
  "foodCategories/fetchItems",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchRecipesById = createAsyncThunk(
  "foodCategories/fetchRecipes",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response.data.meals === null)
        return thunkAPI.rejectWithValue("meal not found");
      return convertMealData(response.data);
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchRecipesByKeyword = createAsyncThunk(
  "foodNames/foodItems",
  async (keyword, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
      );
      return response.data;
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getRandomItem = createAsyncThunk(
  "getRandom/foodNames",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      return convertMealData(response.data);
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const categoryFoodSlice = createSlice({
  name: "foodItems",
  initialState,

  reducers: {
    getHistory: (state) => {
      // here we are finding data from history and putting that data in stringhistory the data will came in strin format bydefault
      const StringHistory = localStorage.getItem("history");
      // here we are converting the string data in json
      const JsonHistory = JSON.parse(StringHistory);
      // we are updating the json data in out initial state i.e. HistoryData
      state.HistoryData = JsonHistory;
    },

    AddHistory: (state, action) => {
      let JsonHistory = state.HistoryData;

      JsonHistory = JsonHistory.filter((item) => {
        return item.mealId !== action.payload.mealId;
      });

      JsonHistory.unshift(action.payload);
      if(JsonHistory.length>10){
        JsonHistory.pop();
      }
      state.HistoryData = JsonHistory;
      const StringHistory = JSON.stringify(JsonHistory);
      localStorage.setItem("history", StringHistory);
    },

    getSavedRecipes: (state)=>{
          const StringSavedRecipe = localStorage.getItem('savedRecipe');
          const JsonSavedRecipe = JSON.parse(StringSavedRecipe);
          state.SaveRecipes = JsonSavedRecipe;
    },

    addSavedRecipes: (state, action)=>{
      let JsonSavedRecipe = state.SaveRecipes;

      JsonSavedRecipe = JsonSavedRecipe.filter((item)=>{
        return item.mealId !== action.payload.mealId;
      });

      JsonSavedRecipe.unshift(action.payload);
       state.SaveRecipes =  JsonSavedRecipe;
       const StringSavedRecipes = JSON.stringify(JsonSavedRecipe);
       localStorage.setItem('savedRecipe', StringSavedRecipes);
    },

    removeSavedRecipes: (state, action)=>{
      let JsonSavedRecipe = state.SaveRecipes;

      JsonSavedRecipe = JsonSavedRecipe.filter((item)=>{
        return item.mealId !== action.payload.mealId;
      });

      state.SaveRecipes =  JsonSavedRecipe;
      const StringSavedRecipes = JSON.stringify(JsonSavedRecipe);
      localStorage.setItem('savedRecipe', StringSavedRecipes);
    }
   
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFoodCategories.pending, (state) => {
      state.currStatus = "loading";
    });

    builder.addCase(fetchFoodCategories.fulfilled, (state, action) => {
      state.currStatus = "successful";
      state.foodCategory = action.payload.categories.sort();
    });

    builder
      .addCase(fetchFoodCategories.rejected, (state, action) => {
        state.currStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCategoryItems.pending, (state) => {
        state.itemsStatus = "loading";
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        state.itemsStatus = "successful";
        state.categoryItems = action.payload.meals;
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.itemsStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchRecipesById.pending, (state) => {
        state.itemsStatus = "loading";
      })
      .addCase(fetchRecipesById.fulfilled, (state, action) => {
        state.itemsStatus = "successful";
        state.currMeal = action.payload;
      })
      .addCase(fetchRecipesById.rejected, (state, action) => {
        state.itemsStatus = "failed";
        state.error = action.error.message;
        state.currMeal = null;
      })

      .addCase(fetchRecipesByKeyword.pending, (state) => {
        state.itemsStatus = "loading";
      })
      .addCase(fetchRecipesByKeyword.fulfilled, (state, action) => {
        state.itemsStatus = "successful";
        state.searchedMeals = action.payload.meals;
      })
      .addCase(fetchRecipesByKeyword.rejected, (state, action) => {
        state.itemsStatus = "failed";
        state.error = action.error.message;
        state.searchedMeals = [];
      });

    builder.addCase(getRandomItem.pending, (state) => {
      state.currStatus = "loading";
    });

    builder.addCase(getRandomItem.fulfilled, (state, action) => {
      state.currStatus = "successful";
      state.RandomRecipe = action.payload;
    });

    builder.addCase(getRandomItem.rejected, (state, action) => {
      state.currStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export const { getHistory, AddHistory, getSavedRecipes, addSavedRecipes, removeSavedRecipes} = categoryFoodSlice.actions;

export default categoryFoodSlice.reducer;
