import React from 'react'
import ShowSurvey from "./ShowSurvey";
import { Navigate } from "react-router-dom";
import { useParams,useNavigate,useLocation } from "react-router-dom";

function ManagerShowSurvey(props) {

  let navigate=useNavigate();
  // let { id } = useParams();
  // let location=useLocation();
  // let report=location.state.report;
  let survey=props.survey;
  debugger;
let cancleReport=async()=>{
  let cancle = await fetch("http://localhost:3569/mySurveys/setReport", {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"surveyCode": survey.surveyCode, "report": false })
});
cancle = await cancle.json();
if(!cancle)
alert("שגיאה");

else{
  navigate(0);
}
}

return (
  <div  class="ShowSurvey">
   <ShowSurvey survey={survey} isManager="true"/>
   <button class='report unReport' onClick={cancleReport}>הסר מרשימת הדיווחים</button>
  </div>
);

}

export default ManagerShowSurvey;
