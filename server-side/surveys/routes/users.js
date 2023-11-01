const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const data = require('./db');
const users=require('../services/users');


router.post('/logIn',async function (req, res,next){
    
    try {
        let body = req.body;
        let user= await users.logIn(body.email,body.password)
        res.json(user);
      } catch (err) {
        console.error(`Error the user not found`, err.message);
        next(err);
      }

    
});

  
router.post('/signUp',async function (req, res,next){
 
    try {
        let body = req.body;
        let sign= await users.signUp(body)
        res.json(sign);
      } catch (err) {
        console.error(`couldnt signUp`, err.message);
        next(err);
      }
  
    
});

router.post('/',async function (req, res,next){

  try {
      let userCode = req.body.userCode;
      let user= await users.getUser(userCode)
      res.json(user);
    } catch (err) {
      console.error(`couldnt get user`, err.message);
      next(err);
    }

  
});

router.put('/updateUser',async function (req, res,next){
  
  try {
      let body = req.body;
      let update= await users.updateUser(body)
      res.json(update);
    } catch (err) {
      console.error(err);
      next(err);
    }

  
});







module.exports = router;
