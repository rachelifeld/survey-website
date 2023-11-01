import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    Link
} from "react-router-dom";
import UserNav from './UserNav';
import Answers from './Answers';
import SurveyResults from './SurveyResults';
function FillingSurvey() {
    let navigate = useNavigate();
    const [survey, setSurvey] = useState({ "questions": [] });
    const [surveyData, setSurveyData] = useState([]);
    const [isEnoughAnswers, setIsEnoughAnswers] = useState(false);
    const [isAvailableSurvey, setIsAvailableSurvey] = useState(true);
    const [seeResults, setSeeResult] = useState(false);
    let userCode = sessionStorage.getItem("userCode");

    useEffect(() => {
        getAvailableSurvey();
    }, []);

    const getAvailableSurvey = async () => {
        let mySurvey = await fetch("http://localhost:3569/mySurveys/getAvailableSurvey", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userCode": userCode })
        });
        mySurvey = await mySurvey.json();
        if (mySurvey) {
            let mySurveyData = [...surveyData];
            for (let i = 0; i < mySurvey.questions.length; i++) {
                mySurveyData.push({ "questionCode": mySurvey.questions[i].questionCode, "answerCode": "" });
            }
            setSurveyData(mySurveyData);
            setSurvey(mySurvey);
        }
        else {
            setIsAvailableSurvey(false);

        }
    }

    const setQuestion = (questionCode, answerCode) => {
        let mySurveyData = [...surveyData];
        for (let i = 0; i < mySurveyData.length; i++) {
            if (mySurveyData[i].questionCode == questionCode) {
                mySurveyData[i].answerCode = answerCode;
                break;
            }
        }
        setSurveyData(mySurveyData);

    }
    const finish = async () => {
        let end = await fetch("http://localhost:3569/surveyData/insertData", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "surveyData": surveyData, "userCode": userCode })
        });
        end = await end.json();
        if (end) {
            if (survey.showResults) {
                setSeeResult(true);
            }
            else {
                navigate(0);
            }
            setIsEnoughAnswers(false);
        }
        else {
            alert("שגיאה");
        }
    }
  
    useEffect(() => {
        checkEnable();
    }, [surveyData]);

    let checkEnable = () => {
        let result = surveyData.filter((questionData) => questionData.answerCode != "");
        if (result.length > 0) {
            setIsEnoughAnswers(true);
        }
        else {
            setIsEnoughAnswers(false);
        }
    }

    const report = async () => {
        if (!survey.report) {
            debugger;
            let report = await fetch("http://localhost:3569/mySurveys/setReport", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "surveyCode": survey.surveyCode, "report": true })
            });
            report = await report.json();
            if (!report)
                alert("שגיאה");
        }
        alert("הסקר דווח ונשלח לבדיקה");
        window.location.reload();
    }
    return (
        <div >
            <div className='firstPadding'></div>
            {isAvailableSurvey && <div class='next'>
                <div>
                    <h1 class='homeTitle'>ענה על הסקר </h1>
                    <div className='fillingButtons' >
                        <Link to={"/home/fillingSurvey"}  > <button class='finishBtn nextBtn' onClick={() => { navigate(0) }}><p>לסקר הבא</p> </button> </Link>
                        <button className='report' onClick={report}>דווח על סקר לא הולם </button>
                    </div>
                    <h2 class='surveyTitle'>{survey.surveyTitle}</h2>
                    <form class='fillingSurvey'>
                        {survey.questions.map((question) => {
                            return (
                                <div class='question'>
                                    <h3 class='questionTitle'>{question.question}</h3>
                                    <Answers answers={question.answers} setQuestion={setQuestion} />
                                </div>
                            )

                        })}
                    </form>
                    <button class='finishBtn' disabled={!isEnoughAnswers} onClick={finish}><p>שליחה</p> </button>
                    <br></br>
                </div>

                {seeResults && <div class="seeResults">
         
                    <button class='finishBtn showResults' disabled={!seeResults} onClick={() => {
                        navigate("/survey/" + survey.surveyCode + "/surveyResults", {
                            state: {
                                "survey": survey,
                                "isFilling": true
                            }
                        })
                    }}><p>צפה בתוצאות</p></button>
                </div>}

            </div>
            }
            {!isAvailableSurvey && <p >ענית על כל הסקרים
            </p>}
        </div>
    );
}

export default FillingSurvey;
