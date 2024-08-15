import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const[keyword, setKeyword] = useState('');


  return (
    <div className="nav-box">
      <img src={logo} alt="logo" onClick={()=>{navigate('/')}} />
      <div >
        <input
          type="text"
          placeholder="Find recipes by item name"
          className="nav-textbox"
          value={keyword}
          onChange={(e)=>{
            setKeyword(e.target.value)
          }}
        />
        <button onClick={()=>{navigate(`/searchByKeyword?key=${keyword}`)}}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
