const db = require('./db');
const config = require('./config');
const users = require('../routes/mySurveys');


async function allSurveys(body) {
    let getAmount = body.getAmount;
    let numOfSurveys = body.numOfSurveys;
    let getNextSurveys = [];
    let surveys = await db.query(
        `SELECT * FROM surveys limit ${getAmount} offset ${numOfSurveys};`
    );
    for (let i = 0; i < surveys.length; i++) {
        let questions = await getQuestions(surveys[i].surveyCode);
        let survey = { ...surveys[i], ...{ "questions": questions } };
        getNextSurveys.push(survey);
    }
    return getNextSurveys;
}

async function allSurveysAmount() {

    let count = await db.query(
        "SELECT count(*) FROM surveys;"
    );

    if (count[0])
        return count[0]["count(*)"];
    return false;
}

async function answeredSurveys(body) {
    let getAmount = body.getAmount;
    let numOfSurveys = body.numOfSurveys;
    let userCode = body.userCode;

    let getNextSurveys = [];
    let surveys = await db.query(
        `SELECT DISTINCT surveys.surveyCode,surveys.surveyTitle ,surveys.userCode,surveys.report,surveys.showResults 
         FROM surveys JOIN surveysquestions ON surveys.surveyCode=surveysquestions.surveyCode 
        JOIN surveyanswers ON surveyanswers.questionCode=surveysquestions.questionCode JOIN surveydata ON 
        surveyanswers.answerCode=surveydata.answerCode WHERE surveydata.userCode=${userCode} limit ${getAmount} offset ${numOfSurveys};`
    );
    for (let i = 0; i < surveys.length; i++) {
        let questions = await getQuestions(surveys[i].surveyCode);
        let survey = { ...surveys[i], ...{ "questions": questions } };
        getNextSurveys.push(survey);
    }
    return getNextSurveys;
}


async function answeredSurveysAmount(body) {

    let userCode = body.userCode;
    let count = await db.query(
        `SELECT count(DISTINCT surveys.surveyCode) FROM surveys JOIN surveysquestions ON surveys.surveyCode=surveysquestions.surveyCode 
        JOIN surveyanswers ON surveyanswers.questionCode=surveysquestions.questionCode JOIN surveydata ON 
        surveyanswers.answerCode=surveydata.answerCode WHERE surveydata.userCode=${userCode};`
    );
    console.log(count[0]);
    if (count[0])
        return count[0]["count(DISTINCT surveys.surveyCode)"];
    return false;
}

async function reports() {
    let reportedSurveys = [];
    let surveys = await db.query(
        "SELECT * FROM surveys WHERE report=1"
    );
    console.log(surveys);
    for (let i = 0; i < surveys.length; i++) {
        let questions = await getQuestions(surveys[i].surveyCode);
        let survey = { ...surveys[i], ...{ "questions": questions } };
        reportedSurveys.push(survey);
    }
    return reportedSurveys;
}

async function setReport(body) {

    let changeReport = await db.query(
        `UPDATE surveys
        SET report =${body.report}
        WHERE surveyCode =${body.surveyCode}; `
    );
    return changeReport;
}
async function mySurveys(body) {

    let surveys = await db.query(
        `SELECT * FROM surveys WHERE userCode=${body.userCode}`
    );
    if (!surveys.length)
        return false;
    let userSurveys = [];
    for (let i = 0; i < surveys.length; i++) {
        let questions = await getQuestions(surveys[i].surveyCode);
        let survey = { ...(surveys[i]), ...{ "questions": questions } };
        userSurveys.push(survey);
    }
    return userSurveys;
}

async function getQuestions(surveyID) {

    let questions = [];
    let myQuestions = await db.query(
        `SELECT * FROM surveysquestions WHERE surveyCode=${surveyID}`
    );

    for (let i = 0; i < myQuestions.length; i++) {
        let answers = await getAnswers(myQuestions[i].questionCode);
        let question = { ...myQuestions[i], ...{ "answers": answers } }
        questions.push(question);
    }
    return questions;
}

async function getAnswers(questionID) {

    let answers = await db.query(
        `SELECT * FROM surveyanswers WHERE questionCode=${questionID}`
    );
    return answers;
}

async function getSurvey(surveyID) {

    let survey = await db.query(
        `SELECT * FROM surveys WHERE surveyCode=${surveyID}`
    );
    if (survey) {
        return survey;
    }
    else {
        return false;
    }
}
async function insertSurvey(body) {

    let isExist = await db.query(
        `SELECT * FROM surveys WHERE surveyTitle='${body.title}' `
    );
    if (isExist.length) {
        return false;
    }
    else {
        let surveyID = await db.query(
            'INSERT INTO' + ' `surveys`' + '(`surveyTitle`,`userCode`,`showResults`)' +
            ` values('${body.title}','${body.userCode}',${body.showResults});`
        );
        return insertQuestions(body.questions, surveyID.insertId);
    }
}



async function insertQuestions(questions, surveyID) {
    questions.forEach(async function (question) {
        let questionID = await db.query(
            'INSERT INTO' + ' `surveysquestions`' + '(`surveyCode`,`question`)' +
            ` values('${surveyID}','${question.question}');`
        );
        let insertAnswers1 = insertAnswers(question.answers, questionID.insertId);
        if (!insertAnswers1) {
            return false;
        }

    })
    return true;

}


async function insertAnswers(answers, questionID) {
    answers.forEach(async function (answer) {
        console.log(answer);
        if (answer != "") {
            let insertAnawer = await db.query(
                'INSERT INTO' + ' `surveyanswers`' + '(`questionCode`,`answer`)' +
                ` values('${questionID}','${answer}');`
            );
            if (!insertAnawer) {
                return false;
            }

        }
    })
    return true;

}

async function deleteSurvey(surveyID) {

    let questions = await db.query(
        `SELECT * FROM surveysquestions WHERE surveyCode='${surveyID}' `
    );
    let deleteQs = await deleteQuestions(questions);
    if (deleteQs) {
        let deleteS = await db.query(
            `DELETE  FROM surveys WHERE surveyCode='${surveyID}' `
        );
        return true;
    }
    else
        return false;


}

async function deleteQuestions(questions) {

    questions.forEach(async function (question) {
        let answers = await db.query(
            `SELECT * FROM surveyanswers WHERE questionCode='${question.questionCode}' `
        );
        let deleteAs = await deleteAnswers(answers);
        if (!deleteAs)
            return false;
        else {
            let deleteQ = await db.query(
                `DELETE  FROM surveysquestions WHERE questionCode='${question.questionCode}' `
            );
        }
    })

    return true;
}

async function deleteAnswers(answers) {

    answers.forEach(async function (answer) {
        let answerData = await db.query(
            `SELECT * FROM surveyData WHERE answerCode='${answer.answerCode}' `
        );
        let deleteData = await deleteAnswerData(answerData);
        if (!deleteData)
            return false;
        else {
            let deleteA = await db.query(
                `DELETE  FROM surveyanswers WHERE answerCode='${answer.answerCode}' `
            );
        }
    })

    return true;
}


async function deleteAnswerData(answerData) {

    answerData.forEach(async function (data) {
        let deleteData = await db.query(
            `DELETE  FROM surveydata WHERE surveyDataCode='${data.surveyDataCode}' `
        );
        if (!deleteData)
            return false;
    });
    return true;
}

async function updateShowResults(body) {
    let update = await db.query(
        `UPDATE surveys
        SET showResults =${body.showResults}
        WHERE surveyCode =${body.surveyCode}; `
    );
    if (!update)
        return false;
    return true;

}


async function getAvailableSurvey(body) {

    let userCode = body.userCode;
    let surveys = await db.query(
        `SELECT * FROM surveys WHERE NOT EXISTS( SELECT 1 FROM 
            surveydata JOIN surveyanswers ON surveydata.answerCode=surveyanswers.answerCode
             JOIN surveysquestions ON surveyanswers.questionCode=surveysquestions.questionCode WHERE 
             surveysquestions.surveyCode=surveys.surveyCode AND surveydata.userCode=${userCode}) AND report=0`
    );
    if (!surveys.length) {
        return false;
    }
    else {
        let i = Math.floor(Math.random() * (surveys.length));
        console.log(i);
        surveys[i].questions = await getQuestions(surveys[i].surveyCode);
        return surveys[i];
    }
}


module.exports = {
    allSurveys, reports, mySurveys, getQuestions, getSurvey, getAvailableSurvey,
    insertSurvey, deleteSurvey, updateShowResults, setReport, allSurveysAmount, answeredSurveys, answeredSurveysAmount
}




