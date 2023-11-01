import React from 'react'
import ShowSurvey from "./ShowSurvey";
import { useParams, useNavigate ,useLocation} from "react-router-dom";
import UserNav from "./UserNav";
import Survey from "./Survey";
import { useState, useEffect } from "react";

function UserShowSurvey(props) {

    let survey=props.survey;
  
    const [showResults, setShowResults] = useState(false);
    useEffect(() => {
        debugger;
      setShowResults(survey.showResults);
    }, []);
   
    let updateShowResults = async () => {
  
        let response = await fetch("http://localhost:3569/mySurveys/updateShowResults", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "surveyCode": survey.surveyCode, "showResults": survey.showResults })
        });

    }
    const changeShowResults = () => {
        survey.showResults=! survey.showResults;
          updateShowResults();
    }

    return (
        <div  class="ShowSurvey">
            <h1 class='h1ForShowSurvey'>{survey.surveyTitle}</h1>
            <ShowSurvey survey={survey} isManager={false}/>
            <div className='showResultsLabel'>
            <label  className='showResultsLabel1'>אפשר ראיית תוצאות</label>
            <input className='showResultsInput' type="checkbox" defaultChecked={survey.showResults} onClick={changeShowResults} /> </div>
        </div>
    );

}

export default UserShowSurvey;

