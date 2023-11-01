import React from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";

import image from "../logo.jpg"
function UserNav() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("userCode"))
      navigate("/");
  }, [])

  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  }
  return (
<div>
    <div class='nav'>
       <Link className="navLinks" to={"/home/updateUser/"}>עדכון פרטים אישיים</Link>

      <Link className="navLinks" to={"/home/mySurveys/"}>הסקרים שלי</Link>

      <Link className="navLinks" to={"/home/"}>ראשי</Link>

      <Link className="navLinks" to={"/home/AnsweredSurveys/"}>הסקרים שעניתי עליהם</Link>

      <button className="navLinks linkBtn" onClick={logOut}>יציאה</button>
    </div>
    <img src={image}/>
  
    </div>
  );
}

export default UserNav;
