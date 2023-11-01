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
import UserNav from './UserNav';
import UserShowSurvey from "./UserShowSurvey";

function MySurveys() {
  let navigate = useNavigate();
  const [mySurveys, setMySurveys] = useState([]);
  const [flag, setFlag] = useState(true);
  const [flags, setFlags] = useState([]);
  useEffect(() => {
    getMySurveys();
  }, []);
  const getMySurveys = async () => {
    let userCode = sessionStorage.getItem("userCode");
    let surveys = await fetch("http://localhost:3569/mySurveys", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "userCode": userCode })
    });
    surveys = await surveys.json();
    if (surveys) {
      initFlags(surveys.length);
      setFlag(true);
      setMySurveys(surveys);

    }
    else {
   
      setFlag(false);
    }
  }

  const initFlags = (size) => {
    let myFlags = [...flags];
    for (let i = 0; i < size; i++) {
      myFlags.push(false);
    }
    setFlags(myFlags);
   
  }

  let changeFlags = (i) => {
    let tmpFlags=[...flags];
    tmpFlags[i]=! tmpFlags[i];
    setFlags(tmpFlags);
  }
  return (
    <div >
      <UserNav />
      <div className='firstPadding'></div>
      <h1 className='addSurveyTitle'>
        הסקרים שלי
      </h1>
      {!flag && <p>תיבת הסקרים שלך ריקה</p>}
      {mySurveys.map((mySurvey, i) => {
        return (
          <div>
        
            <button class='linkToSurveys' onClick={()=>{changeFlags(i)}}>{mySurvey.surveyTitle}</button>
            {
              flags[i] && <UserShowSurvey survey={mySurvey} />
            }
     
          </div>
        )
      })}
      
      <button class='finishBtn addsurveyBtn' onClick={() => { navigate("/home/mySurveys/newSurvey/") }}><p>הוסף סקר</p></button>
    </div>
  );
}

export default MySurveys;


