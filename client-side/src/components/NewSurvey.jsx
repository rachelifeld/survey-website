import React from 'react'
import { useState, useEffect } from 'react';
import UserNav from './UserNav';
import AddQuestion from './AddQuestion';
import { useNavigate } from 'react-router-dom';

function NewSurvey() {
  const [survey, setSurvey] = useState({
    "title": "",
    "questions": [],
    "showResults": true,
    "userCode": sessionStorage.getItem("userCode")
  });
  const [flag, setFlag] = useState(false);
  const [isEnough, setIsEnough] = useState(false);
  let navigate = useNavigate();

  let addQuestion = (question) => {
    let myQuestions = [...survey.questions];
    myQuestions.push(question);
    setSurvey({ ...survey, ...{ questions: myQuestions } });
    setFlag(false);
    console.log(survey);
  }
  useEffect(() => {
    checkEnable();
  }, [survey]);

  let checkEnable = () => {
    debugger;
    if (survey.title != "" && survey.questions.length) {
      setIsEnough(true);
    }
    else {
      setIsEnough(false);
    }
  }

  const addSurvey = async () => {
    console.log(survey);
    let result = await fetch("http://localhost:3569/mySurveys/insertSurvey", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(survey)
    });
    result = await result.json();
    debugger;
    if (result) {
      navigate("/home/mySurveys/")
    }
    else {
      alert("שגיאה");
    }
  }

  return (
    <div >
      <UserNav />
      <div className='firstPadding'></div>
      <h1 className='addSurveyTitle'>
        הוספת סקר
      </h1>
      <div className='question noHeight'>
        <div className='titleAndInput'>
      <label className='labelNewSurvey'>שם הסקר</label>
      <input class='inputSurveyTitle '
        id="title"
        name="title"
        type="text"
        value={survey.title}
        onChange={event => { setSurvey({ ...survey, ...{ title: event.target.value } }); }}
      />
      </div>
      
      {survey.questions.map((question, i) => {
        return (<div className='labelForQuestion'>
          <label className='answerNumber'>  {i + 1}.  </label>
          <p class='showAnswer'>{question.question}</p>
        </div>)
      })
      }
      <button className='finishBtn addQuestion' onClick={() => { setFlag(!flag) }}><p>הוסף שאלה</p></button>
      {flag && <AddQuestion addQuestion={addQuestion} />}
     <div className='showResultsLabel'>
      <label className='showResultsLabel1'>אפשר ראיית תוצאות</label>

      <input className='showResultsInput' type="checkbox" defaultChecked={survey.showResults} onClick={() => { setSurvey({ ...survey, ...{ showResults: !(survey.showResults) } });  }} /> <br />
      </div>
      <button className='finishBtn finishAddingSurvey' disabled={!isEnough} onClick={addSurvey}><p>סיום</p></button>
    </div>
    </div>
  );
}

export default NewSurvey;
