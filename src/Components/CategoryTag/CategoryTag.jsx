import React from "react";
import "./CategoryTag.css";

const CategoryTag = ({ category, onClick, active }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className= {`category-tag ${active ? 'active-tag': ''}`} onClick={handleClick}>
      <img src={category.strCategoryThumb} alt={category.strCategory} />
      <p>{category.strCategory}</p>
    </div>
  );
};

export default CategoryTag;
