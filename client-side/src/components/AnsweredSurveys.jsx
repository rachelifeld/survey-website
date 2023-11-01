import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ManagerShowSurvey from "./ManagerShowSurvey";
import ShowSurvey from "./ShowSurvey";
import UserNav from "./UserNav";
import React from 'react'
function AnsweredSurveys() {
    let getAmount = 10;

    const [answeredSurveys, setAnsweredSurveys] = useState([]);
    const [surveyAmount, setSurveyAmount] = useState();
    const [isMore, setIsmore] = useState(true);
    const [numOfSurveys, setNumOfSurveys] = useState(0);
    const [flags, setFlags] = useState([]);
    let userCode = sessionStorage.getItem("userCode");
    useEffect(() => {
        getSurveyAmount();
    }, []);
    const getSurveyAmount = async () => {
        let amount = await fetch("http://localhost:3569/mySurveys/answeredSurveys/amount", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userCode": userCode })
        });
        amount = await amount.json();
        if (amount <= getAmount) {
            setIsmore(false);
        }
        setSurveyAmount(amount);
        getSurveys();
    
    }
    const getSurveys = async () => {
        let surveys = await fetch("http://localhost:3569/mySurveys/answeredSurveys", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "getAmount": getAmount, "numOfSurveys": numOfSurveys, "userCode": userCode })
        });
        surveys = await surveys.json();
        let tempSurveys = [...answeredSurveys];
        tempSurveys = [...tempSurveys, ...surveys];
        if (tempSurveys.length == surveyAmount) {
            debugger;
            setIsmore(false);
        }
        debugger;
        updateFlags();
        setNumOfSurveys(numOfSurveys + getAmount);
        setAnsweredSurveys(tempSurveys);
    }
    const updateFlags = () => {
        let newFlags = [];

        for (let i = 0; i < getAmount; i++) {
            newFlags.push(false);
        }
        let tempFlags = [...flags, ...newFlags];
        setFlags(tempFlags);
    }
    let changeFlags = (i) => {
        let tempFlags = [...flags];
        tempFlags[i] = !tempFlags[i];
        setFlags(tempFlags);
    }
    return (

        <div >
            <UserNav/>
            <div className="firstPadding"></div>
            <h1 className="addSurveyTitle">
               סקרים שענית עליהם
            </h1>
            {answeredSurveys.map((survey, i) => {
                return (<div id="reportLink">
                    <button class='linkToSurveys' onClick={() => { changeFlags(i) }}>{survey.surveyTitle}</button>
                    {
                        flags[i] && <div class="ShowSurvey"><ShowSurvey survey={survey} isManager={false}/></div>
                    }
                </div>);

            })}
            <button className="finishBtn moreSurveysBtn" disabled={!isMore} onClick={getSurveys}><p>עוד</p></button>
        </div>
    );
}

export default AnsweredSurveys;
