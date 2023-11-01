const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const sqlData = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234.com",
    database: "surveys"
});

sqlData.connect(function (err) {
    if (err)
        console.log(err);
    else console.log("work");
});
module.exports = sqlData;