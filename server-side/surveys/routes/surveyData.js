const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const data = require('./db');
// const surveyData=require('../services/surveyData');
const surveyData=require("../services/surveyData");


router.post('/insertData',async function (req, res,next){
    
    try {
        let body=req.body;
        let insert= await surveyData.insertData(body);
        res.json(insert);
      }
       catch (err) {
        console.log(err);
        next(err);
      }
    
});

router.get('/surveyResults/:id',async function (req, res,next){
    
  try {
      let surveyCode=req.params.id;
      let results= await surveyData.surveyResults(surveyCode);
      res.json(results);
    }
     catch (err) {
      console.log(err);
      next(err);
    }
  
});


router.get('/questionDetails/:id',async function (req, res,next){
    
  try {
      let questionCode=req.params.id;
      let results= await surveyData.questionDetails(questionCode);
      res.json(results);
    }
     catch (err) {
      console.log(err);
      next(err);
    }
  
});




module.exports = router;