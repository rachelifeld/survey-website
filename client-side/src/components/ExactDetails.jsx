import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import ManagerNav from "./ManagerNav"
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
function ExactDetails(props) {
  let questionResults = props.questionResults;
  let question = props.question;
  console.log(questionResults);
  debugger;
  const [details, setDetails] = useState([]);
  const [showBy, setShowBy] = useState("genders")
  useEffect(() => {
    getQuestionDetails();

  }, [])
  const getQuestionDetails = async () => {
    debugger;
    let details = await fetch("http://localhost:3569/surveyData/questionDetails/" + question.questionCode);
    details = await details.json();
    console.log(details);
    setDetails(details)
  }


  return (
    <div>
      <labal class='sortBy' for="sortBy">ראה תוצאות לפי:</labal>
      <select class='selectProperty' name="sortBy" id="sortBy" onChange={(e)=>{setShowBy(e.target.value)}}>
        <option value="genders">מין</option>
        <option value="areas">איזור מגורים</option>
        <option value="ages">גיל</option>
        <option value="sectors">מגזר</option>
      </select>
      <div className="App">
        <table className='table'>
          <thead>
          <tr>
            <th>תשובה</th>
            <th>מספר הבוחרים בתשובה</th>
            {details.length && <div class="tableRows">{details[0][showBy].properties.map((property) => {
              return (
                <th>{property}</th>
              )

            })}
            </div>}
         </tr>
         </thead>
          {details.map((answerDetails, i) => {
            let votes = questionResults.answersResults[i].value;
            if (votes)
              return (
             
                <tr style={{ "background-color": questionResults.answersResults[i].color }}>
                 <td>{question.answers[i].answer}</td>
                  <td>{votes}</td>
                  {answerDetails[showBy].properties.map((property) => {
                    return (<td>{Math.round(answerDetails[showBy][property] / votes * 100)}%</td>)
                  })}

                </tr>
              )
            else
              return (
                <tr style={{ "background-color": questionResults.answersResults[i].color }}>
                  <td>{question.answers[i].answer}</td>
                  <td>{votes}</td>
                  {answerDetails[showBy].properties.map((property) => {
                    return (<td>/</td>)
                  })}


                </tr>
              )

          })}
        </table>
      </div>
    </div>
  );
}

export default ExactDetails;