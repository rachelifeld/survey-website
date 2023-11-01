import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllSurveys from "./AllSurveys";
import Reports from "./Reports";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import ManagerNav from "./ManagerNav"
import image from "../aaa.JPG"

function ManagerPage() {
  sessionStorage.setItem("isManager", true);
  let navigate = useNavigate()
  const [flagReports, setFlagReports] = useState(false);

  return (
    <div id='managerPage'>
      <ManagerNav />
      <div className='firstPadding'></div>
    
      <Reports />
 
    </div>
  );
}

export default ManagerPage;
