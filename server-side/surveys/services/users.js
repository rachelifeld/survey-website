const db = require('./db');
const config = require('./config');
const users = require('../routes/users')

async function logIn(email, password) {

    let user = await db.query(
        `SELECT * FROM users WHERE userEmail='${email}' And userPassword = ${password}`
    );
    console.log(user[0]);
    if (user[0])
        return user;
    // res.json(result);
    else
        return false;
}


async function signUp(body) {
    let exist = await db.query(
        `SELECT * FROM users WHERE userEmail='${body.email}'`
    );
    if (exist.length) {
        return false;
    }

    else {
        let sign = await db.query('INSERT INTO' + ' `users`' + '(`userEmail`,`birthYear`,`areaID`,`genderID`,`sectorID`,`userPassword`)' +
            ` values('${body.email}','${body.age}','${body.area}','${body.gender}','${body.sector}','${body.password}');`);
        return sign.insertId;
    }

}

async function getUser(userCode) {

    let user = await db.query(
        `SELECT * FROM users 
         WHERE userCode=${userCode} `
    );
    console.log(user[0]);
    if (user[0])
        return user[0];
    // res.json(result);
    else
        return false;
}


async function updateUser(body) {

    let update = await db.query(
        `UPDATE users
        SET userEmail='${body.userEmail}', userPassword ='${body.userPassword}', 
        birthYear=${body.birthYear}, areaID=${body.areaID}, genderID=${body.genderID}, sectorID=${body.sectorID}
        WHERE userCode =${body.userCode}; `
    );

    if (update)
        return true;
    // res.json(result);
    else
        return false;
}
module.exports = {
    logIn, signUp, getUser, updateUser
}

