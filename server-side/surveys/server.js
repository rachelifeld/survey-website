const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const users = require("./routes/users");
const properties = require("./routes/properties");
const mySurveys = require("./routes/mySurveys");
const surveyData=require("./routes/surveyData")

const app = express();
const port = 3569;

app.use(express.json());
app.use(cors());
app.use('/mySurveys', mySurveys);
app.use('/users', users);
app.use('/properties',properties);
app.use('/surveyData', surveyData);
app.listen(port, () => {
    console.log('server is up and running')
});