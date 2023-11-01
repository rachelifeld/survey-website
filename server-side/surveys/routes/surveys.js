const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const data = require('./db');

// router.get('/:id', (req, res) => {

//     data.query(`SELECT * FROM surveys WHERE surveyCode=${req.params.id}`, function (err, result) {
//         if (err)
//             console.log(err);
//         console.log(result);
//         if (result)
//             res.json(result);
//             else{
//                 res.send(false);
//             }
//     });
// });


// router.get('/allSurveys', (req, res) => {
//     console.log("ii");
//     data.query("SELECT * FROM surveys.surveys;", function (err, result) {
//         if (err)
//             console.log(err);
//         console.log(result);
//        res.json(result);
//     });
// });

// router.get('/reports', (req, res) => {
//     data.query("SELECT * FROM surveys WHERE report=1", function (err, result) {
//         if (err)
//             console.log(err);
//         console.log(result);
//         res.json(result);
//     });
// });

// router.get('/questions/:id', (req, res) => {
//     data.query(`SELECT * FROM surveys.surveysquestions WHERE surveyCode=${req.params.id}`, function (err, result) {
//         if (err)
//             console.log(err);
//         console.log(result);
//         if (result)
//             res.json(result);
//             else{
//                 res.send(false);
//             }
//     });
// });

// router.get('/answers/:questionID', (req, res) => {
//     data.query(`SELECT * FROM surveyanswers WHERE questionCode=${req.params.questionID}`, function (err, result) {
//         if (err)
//             console.log(err);
//         console.log(result);
//         res.json(result);
//     });
// });

// router.post('/:userPhone', (req, res) => {
//     debugger;
//     let body = req.body;
//     data.query(`SELECT * FROM surveys WHERE userPhone=${body.phone}`, function (err, result) {
//         if (err)
//             console.log(err);
//         if (result.length)
//             res.json(result);
//         else
//             res.send(false);
//     });
// });


// router.post('/insertSurvey', (req, res) => {
//     console.log("kkkkkkkkk");
//     debugger;
//     let body = req.body;
//     let phone=1234;
//     data.query(`SELECT * FROM surveys WHERE surveyTitle=${body.title} `, function (err, result) {
//         if (err)
//             console.log(err);
//         if (result)
//             res.send(false);
//         else {
//             data.query('INSERT INTO' + ' `surveys`' + '(`surveyTitle`,`userPhone`,`showResults`)' +
//                 ` values('${body.title}','${phone}','${body.showResults}');`, function (err, result) {
//                     if (err)
//                         console.log(err);
//                     else
//                         res.send(true);
//                 });
//             //res.send(true);
//         }
//     });
// });



module.exports = router;