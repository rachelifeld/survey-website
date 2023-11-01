const db = require('./db');
const config = require('./config');
const surveyData = require('../routes/surveyData');

async function insertData(body) {

    console.log(body.surveyData);
    body.surveyData.forEach(async function (answerData) {
        if (answerData.answerCode != "") {
            let insert = await db.query(
                'INSERT INTO' + ' `surveyData`' + '(`userCode`,`answerCode`)' +
                ` values('${body.userCode}',${answerData.answerCode});`);
            if (!insert) {
                return false;
            }
        }
    });
    return true;
}

async function surveyResults(surveyCode) {
    let results = { "surveyParticipants": "", "questionsResults": [] };
    let surveyConter = await db.query(` SELECT count(DISTINCT users.userCode) FROM users 
    JOIN surveydata ON users.userCode=surveydata.userCode JOIN surveyanswers ON surveyanswers.answerCode=
    surveydata.answerCode JOIN surveysquestions ON surveysquestions.questionCode=surveyanswers.questionCode 
    WHERE surveysquestions.surveyCode=${surveyCode}`);

    results.surveyParticipants = surveyConter[0]["count(DISTINCT users.userCode)"];
    let questions = await db.query(
        `SELECT * FROM surveysquestions WHERE surveyCode='${surveyCode}' `
    );
    for (let i = 0; i < questions.length; i++) {
        let questionData = await questionResults(questions[i].questionCode);
        results.questionsResults.push(questionData);
    }
    return results;
}

async function questionResults(questionCode) {
    let questionData = { "questionParticipants": "", "answersResults": [] };
    let questionCounter = await db.query(` SELECT count(users.userCode) FROM users 
    JOIN surveydata ON users.userCode=surveydata.userCode JOIN surveyanswers ON surveyanswers.answerCode=
    surveydata.answerCode WHERE surveyanswers.questionCode=${questionCode}`);
    questionData.questionParticipants = questionCounter[0]["count(users.userCode)"];
    let answers = await db.query(
        `SELECT * FROM surveyanswers WHERE questionCode='${questionCode}' `
    );
    for (let i = 0; i < answers.length; i++) {
        let answerParticipants = await answerResults( answers[i].answerCode);
        questionData.answersResults.push({ "answerParticipants": answerParticipants });
    }
    console.log(questionData);
    return questionData;
}

async function answerResults( answerCode) {
    let answerCounter = await db.query(` SELECT count(users.userCode) FROM users 
    JOIN surveydata ON users.userCode=surveydata.userCode WHERE surveydata.answerCode=${answerCode}`);

    return answerCounter[0]["count(users.userCode)"];
}

//http://localhost:3569/surveyData/questionDetails/50
async function questionDetails(questionCode) {
    let questionDetails = [];
    let answers = await db.query(
        `SELECT * FROM surveyanswers WHERE questionCode='${questionCode}' `
    );
    for (let i = 0; i < answers.length; i++) {
        let answerDetails = await getAnswerDetails(answers[i].answerCode);
        questionDetails.push(answerDetails)
    }
    console.log(questionDetails);
    return questionDetails;
}
async function getAnswerDetails(answerCode) {
    let genders = await getGenders(answerCode);
    let areas = await getAreas(answerCode);
    let sectors = await getSectors(answerCode);
    let ages = await getAges(answerCode);
 
    let answerDetails = { "genders": genders, "areas": areas, "sectors": sectors, "ages": ages };
    return answerDetails;
}

async function getGenders(answerCode) {
    let answerGenders = {};
    let genders = await db.query(
        `SELECT * FROM genders  `
    );
    answerGenders.properties = [];
    for (let i = 0; i < genders.length; i++) {
        answerGenders.properties.push(genders[i].gender)
    }
    for (let i = 0; i < genders.length; i++) {
        let genderCount = await getGender(answerCode, genders[i].genderID)
        answerGenders[answerGenders.properties[i]] = genderCount;
    }
    return answerGenders;
}


async function getGender(answerCode, genderID) {
    let genderCount = await db.query(
        `select count(users.userCode) from users join surveydata on surveydata.userCode=users.userCode 
        where surveydata.answerCode=${answerCode} and users.genderID=${genderID}`
    );

    return genderCount[0]["count(users.userCode)"];
}

async function getAreas(answerCode) {
    let answerAreas = {};
    let areas = await db.query(
        `SELECT * FROM areas  `
    );
    answerAreas.properties = [];
    for (let i = 0; i < areas.length; i++) {
        answerAreas.properties.push(areas[i].area)
    }
    for (let i = 0; i < areas.length; i++) {
        let areaCount = await getArea(answerCode, areas[i].areaID)
        answerAreas[answerAreas.properties[i]] = areaCount;
    }
    return answerAreas;
}

async function getArea(answerCode, areaID) {
    let areaCount = await db.query(
        `select count(users.userCode) from users join surveydata on surveydata.userCode=users.userCode 
        where surveydata.answerCode=${answerCode} and users.areaID=${areaID}`
    );

    return areaCount[0]["count(users.userCode)"];
}

async function getSectors(answerCode) {
    let answerSectors = {};
    let sectors = await db.query(
        `SELECT * FROM sectors  `
    );
    answerSectors.properties = [];
    for (let i = 0; i < sectors.length; i++) {
        answerSectors.properties.push(sectors[i].sector)
    }
    for (let i = 0; i < sectors.length; i++) {
        let sectorCount = await getSector(answerCode, sectors[i].sectorID)
        answerSectors[answerSectors.properties[i]] = sectorCount;
    }
    console.log(answerSectors);
    return answerSectors;
}


async function getSector(answerCode, sectorID) {
    let sectorCount = await db.query(
        `select count(users.userCode) from users join surveydata on surveydata.userCode=users.userCode 
        where surveydata.answerCode=${answerCode} and users.sectorID=${sectorID}`
    );

    return sectorCount[0]["count(users.userCode)"];
}

async function getAges(answerCode) {
    let answerAges = {};
    let ages = await db.query(
        `SELECT * FROM ages  `
    );
    answerAges.properties = [];

    for (let i = 0; i < ages.length; i++) {
        answerAges.properties.push(`${ages[i].startYear}-${ages[i].endYear}`)
    }
    for (let i = 0; i < ages.length; i++) {
        let ageCount = await getAge(answerCode, ages[i].startYear, ages[i].endYear)
        answerAges[answerAges.properties[i]] = ageCount;
    }
    return answerAges;
}


async function getAge(answerCode, startYear, endYear) {
    const currentYear = new Date().getFullYear();
    let ageCount = await db.query(
        `select count(users.userCode) from users join surveydata on surveydata.userCode=users.userCode 
        where surveydata.answerCode=${answerCode} and users.birthYear<=${currentYear - startYear} and users.birthYear>=${currentYear - endYear}`
    );

    return ageCount[0]["count(users.userCode)"];
}

module.exports = {
    insertData, surveyResults, questionDetails
}

