import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './Home.css'
import RandomRecipe from '../../Components/RandomRecipe/RandomRecipe'
import RecipeHistory from '../../Components/RecipeHistory/RecipeHistory'
import ExploreCategory from '../../Components/Explore-category/ExploreCategory'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import SavedRecipes from '../../SavedRecipes/SavedRecipes'
 


const Home = () => {
  return (
    <div className='home-body'>
       <RandomRecipe/>
       <ExploreCategory/>
       <SavedRecipes/>
      <RecipeHistory/>
      <Footer/>
    </div>
  );
};

export default Home;
