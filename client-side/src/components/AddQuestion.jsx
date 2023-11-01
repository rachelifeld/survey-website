import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import UserNav from './UserNav';

function AddQuestion(props) {
    let addQuestion = props.addQuestion;
    const [question, setQuestion] = useState({
        "question": "",
        "answers": ["", "", "", "", "", ""]
    });
    const [isEnoughAnswers, setIsEnoughAnswers] = useState(false);

    const changeAnswer = (answer, i) => {
        let myAnswers = [...question.answers];
        myAnswers[i] = answer;
        setQuestion({ ...question, ...{ "answers": myAnswers } });
   
    }

    const handleSubmit = event => {


        event.preventDefault();
        addQuestion(question);

    };
    useEffect(() => {
        console.log('Do something after counter has changed', question);
        checkEnable();
    }, [question]);
    let checkEnable = () => {
        debugger;
        let counter = 0;
        console.log(question);
        let result = question.answers.filter((answer) => answer != "");
        if (result.length >=2 && question.question != "") {
            setIsEnoughAnswers(true);
        }
        else {
            setIsEnoughAnswers(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='titleAndInput'>
                <label className='labelNewSurvey'>שאלה</label>
                <input class='inputSurveyTitle inputQuestion'
                    id="question"
                    name="question"
                    type="text"
                    onChange={(e) => { setQuestion({ ...question, ...{ "question": e.target.value } }); }}
                    value={question.question}
                />
              </div>
                <label className='answerTitleTwo'>הכנס 2 תשובות לפחות</label>
                {question.answers.map((answer, i) => {
                    return (
                        <div key={i}>
                            <label className='labelNewSurvey answerNumber'> {i + 1} .</label>
                            <input class='inputSurveyTitle inputAnswer'
                                id="answer"
                                name="answer"
                                type="text"
                                value={answer}
                                onChange={event => changeAnswer(event.target.value, i)}
                            />
                        </div>
                    )

                })}
                <button className='finishBtn finishAddingSurvey' disabled={!isEnoughAnswers} type="submit"> <p>אישור</p></button>
            </form>
        </div>
    );
}

export default AddQuestion;
