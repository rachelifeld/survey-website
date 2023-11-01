import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";
import UserNav from './UserNav';
import ManagerNav from "./ManagerNav"
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import ExactDetails from "./ExactDetails"


function SurveyResults() {
    let colors = ["rgb(242, 66, 66)", "rgb(57, 144, 74)", "rgb(31, 77, 205)", "rgb(203, 21, 182)", "rgb(210, 140, 8)", "rgb(208, 201, 17)"];
    let navigate = useNavigate();
    const [surveyResults, setSurveyResults] = useState({ "surveyParticipants": "", "questionsResults": [{ "questionParticipants": "", "answersResults": [] }] });
    const [flags, setFlags] = useState([]);
    let location = useLocation();
    let survey = location.state.survey;
    console.log(survey);
    useEffect(() => {
        initFlags(survey.questions.length);
        getResults();

    }, [])
    const getResults = async () => {
        let results = await fetch("http://localhost:3569/surveyData/surveyResults/" + survey.surveyCode);
        debugger;
        results = await results.json();
        updateResults(results);
        console.log(results);
    }

    let updateResults = (results) => {
        results.questionsResults.map((questionResults) => {     
            for (let i = 0; i < questionResults.answersResults.length; i++) {
                let answerResults = {
                    "title": questionResults.answersResults[i].answerParticipants,
                    "color": colors[i],
                    "value": questionResults.answersResults[i].answerParticipants,
                }
                questionResults.answersResults[i] = answerResults;
            }
        })
        setSurveyResults(results);
    }

    const initFlags = (size) => {
        let myFlags = [...flags];
        for (let i = 0; i < size; i++) {
            myFlags.push(false);
        }
        setFlags(myFlags);
    }

    let changeFlags = (i) => {
        let tempFlags = [...flags];
        tempFlags[i] = !tempFlags[i];
        setFlags(tempFlags);

    }

    return (
        <div>
            {!location.state.isManager && <UserNav />}
            {location.state.isManager && <ManagerNav />}
            {location.state.isFilling &&<div class='padding'> <button class='finishBtn nextBtn ' onClick={() => { navigate(-1) }}><p>לסקר הבא</p></button></div>}
            <div class="participants">
                <h1>{survey.surveyTitle} </h1>
                <h3 id="participants">( {surveyResults.surveyParticipants} משתתפים בסקר)</h3>
            </div>
            <hr></hr>
            {surveyResults.questionsResults.map((questionResults, i) => {
                return (
                    <div>
                        <div class="questionParticipants">
                            <h2>{i + 1}.  {survey.questions[i].question}</h2>
                            <p id="questionParticipants">({questionResults.questionParticipants} משתתפים ענו על השאלה)</p>
                        </div>
                        <div className='flex'>
                            <div >
                                {questionResults.answersResults.map((answerResults, j) => {
                                    return (
                                        <div class="answerChart" >
                                            <li style={{ "color": answerResults.color }}> {survey.questions[i].answers[j].answer}</li>
                                         
                                        </div>
                                    )
                                })}                             

                            </div>
                            <div>
                                <PieChart className='pieChart'
                                    data={questionResults.answersResults}
                                    labelStyle={{
                                        fontSize: "60%",
                                        fill: "#000"
                                    }}
                                    label={({ dataEntry }) => {
                                        if (dataEntry.title != 0)
                                            return `${Math.round(dataEntry.percentage)}%`
                                    }
                                    }

                                /> </div>
                        </div>
                        <button class='finishBtn moreBtn' onClick={() => { changeFlags(i) }}><p>עוד פרטים</p></button>
                        {flags[i] && <div>
                            <ExactDetails  question={survey.questions[i]} questionResults={questionResults}  />
                        </div>}

                        <hr></hr>
                    </div>
                )
            })}

        </div>
    );
}

export default SurveyResults;
