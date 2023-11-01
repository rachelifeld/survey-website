import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Answers from "./Answers"
import UserNav from './UserNav';
import { Navigate } from "react-router-dom";
function ShowSurvey(props) {
  let navigate = useNavigate();
  debugger;
  let survey = props.survey;
  let isManager = props.isManager;
  let userCode = sessionStorage.getItem("userCode");


  const deleteSurvey = async () => {
    let result = await fetch("http://localhost:3569/mySurveys/deleteSurvey/" + survey.surveyCode, { method: 'DELETE' });
    result = await result.json();
    if (result)
      navigate(0);
    else
      alert("שגיאה");
  }
  let flag1 = (survey.showResults || (userCode == survey.userCode) || isManager) ? true : false;
  let flag2 = (isManager || (userCode == survey.userCode)) ? true : false;
  return (
    <div>
      {survey.questions.map((question, i) => {
        debugger;
        return (<div>
          <h3> {i + 1}. {question.question}</h3>
          <ul>
            {question.answers.map((answer, j) => {
              debugger;
              return (<li>{answer.answer} </li>)
            })}
          </ul>
        </div>)
      })}
   
      {
        flag1 && <button  class='finishBtn showResults' onClick={() => { navigate("/survey/" + survey.surveyCode + "/surveyResults", { state: { "survey": survey, "isManager": isManager } }) }}><p>צפה בתוצאות </p></button>}
      {flag2 && <button className='report' onClick={deleteSurvey}>מחק סקר</button>}

    </div>
  );
}

export default ShowSurvey;
