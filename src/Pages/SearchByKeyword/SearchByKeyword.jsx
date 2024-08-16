import React, { useEffect } from 'react'
import './SearchByKeyword.css'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByKeyword } from '../../Store/CategoryFoodSlice';
import CategoryItems from '../../Components/CategoryItems/CategoryItems';

const SearchByKeyword = () => {

    const[searchParams] = useSearchParams();
    const key = searchParams.get('key')

    const dispatch = useDispatch();
    const SearchedRecipes = useSelector((state)=>state.CategorySlice.searchedMeals)
    const status = useSelector((state)=>state.CategorySlice.itemsStatus)

    useEffect(()=>{
        dispatch(fetchRecipesByKeyword(key));
    },[key, dispatch]);


  return (
    <div className='searchKeyword-outer-container'>
    <h1>Here are your Searched items!</h1>
      <div className="category-items">
        {status === "loading" && <div>Loading...</div>}
        {status === "successful" &&
            SearchedRecipes.map((item) => (
            <CategoryItems key={item.idMeal} item={item} />
          ))}
        {status === "failed" && <div>search failed, Try again</div>}
      </div>
    </div>
  )
}

export default SearchByKeyword

 