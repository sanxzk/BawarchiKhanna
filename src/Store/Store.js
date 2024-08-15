import { configureStore } from "@reduxjs/toolkit";
import CategoryFoodSlice from "./CategoryFoodSlice";

 const store = configureStore({
    reducer:
    {
      CategorySlice: CategoryFoodSlice,
    },
 });

 export default store;