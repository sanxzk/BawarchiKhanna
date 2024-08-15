import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import CategoryItems from "../../Components/CategoryItems/CategoryItems";
import CategoryTag from "../../Components/CategoryTag/CategoryTag";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoodCategories,
  fetchCategoryItems,
} from "../../Store/CategoryFoodSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const collectCategory = useSelector(
    (state) => state.CategorySlice.foodCategory
  );
  const categoryItems = useSelector(
    (state) => state.CategorySlice.categoryItems
  );
  const categoryStatus = useSelector((state) => state.CategorySlice.currStatus);
  const itemsStatus = useSelector((state) => state.CategorySlice.itemsStatus);
  const error = useSelector((state) => state.CategorySlice.error);

  const [currCat, setCurrCat] = useState("");

  // Sending the command for API call
  useEffect(() => {
      dispatch(fetchFoodCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryStr) => {
    dispatch(fetchCategoryItems(categoryStr));
    setCurrCat(categoryStr);
  };

  return (
    <div className="category-page">
      <h1>Life is too short for bad food. Choose your recipes wisely!</h1>

      <div className="category-tag-parent">
        {categoryStatus === "loading" && <div>Loading...</div>}
        {categoryStatus === "successful" &&
          collectCategory.map((items) => (
            <CategoryTag
              key={items.idCategory}
              active={currCat === items.strCategory}
              category={items}
              onClick={() => handleCategoryClick(items.strCategory)}
            />
          ))}
        {categoryStatus === "failed" && <div>{error}</div>}
      </div>
      <div className="category-items">
       {categoryItems.length === 0 && itemsStatus !== "loading" ? <h2>Please choose from above categories!</h2>:null}
        {itemsStatus === "loading" && <div>Loading...</div>}
        {itemsStatus === "successful" &&
          categoryItems.map((item) => (
            <CategoryItems key={item.idMeal} item={item} />
          ))}
        {itemsStatus === "failed" && <div>{error}</div>}
      </div>
    </div>
  );
};

export default CategoryPage;
