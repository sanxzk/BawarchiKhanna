import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import RecipePage from "./Pages/RecipePage/RecipePage";
import SearchByKeyword from "./Pages/SearchByKeyword/SearchByKeyword";
import { getHistory, getSavedRecipes } from "./Store/CategoryFoodSlice";


function App() {
  const dispatch = useDispatch();

  // Ensure local storage has 'history' key
  useEffect(() => {
    const historyData = localStorage.getItem('history');
    if (historyData === null) {
      localStorage.setItem('history', '[]');
    } else {
      dispatch(getHistory());
    }
  }, [dispatch]);


  
  useEffect(() => {
    const SavedRecipeData = localStorage.getItem('savedRecipe');
    if (SavedRecipeData === null) {
      localStorage.setItem('savedRecipe', '[]');
    } else {
      dispatch(getSavedRecipes());
    }
  }, [dispatch]);



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoryPage" element={<CategoryPage />} />
          <Route path="/recipePage" element={<RecipePage />} />
          <Route path="/searchByKeyword" element={<SearchByKeyword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
