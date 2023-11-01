import { useEffect, useState } from "react";
import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import GetProperties from "./GetProperties";
// import image from "../aaa.JPG"
import image from "../logo.jpg"
function SignUp() {
    let navigate = useNavigate();
    const [genders, setGenders] = useState([]);
    const [areas, setAreas] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [newUser, setNewUser] = useState({
        "age": "",
        "gender": 1,
        "area": 1,
        "sector": 1,
        "email": "",
        "password": ""
    });
    const sign = async () => {
        if (newUser.email == "" || newUser.password == "" || newUser.age == "") {
            alert("חובה למלא את כל הפרטים!");
            return;
        }

        if (!isEmailValid()) {
            alert("כתובת האימייל אינה תקינה");
            return;
        }
        if (!isBirthYearValid()) {
            alert("שנת לידה אינה תקינה");
            return;
        }
        let userCode = await fetch("http://localhost:3569/users/signUp", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        userCode = await userCode.json();
        if (userCode) {
            navigate("/home");
        }
        else {
            alert("כתובת אימייל זו כבר קיימת אנא היכנס כמשתמש קיים");
        }
        sessionStorage.setItem("userCode", userCode)
    }
    const isEmailValid = () => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return pattern.test(newUser.email.toLowerCase());
    };

    const isBirthYearValid = () => {
        const currentYear = new Date().getFullYear();
        if (newUser.age < currentYear - 120 || newUser.age > currentYear - 14) {
            return false;
        }
        return true;
    }


    return (
        <div>

            <GetProperties setSectors={setSectors} setAreas={setAreas} setGenders={setGenders} />
            <h1 class='webTitle'>סקרים</h1>
            <img src={image} />
            <div class='logInBox' id='signUp'>
                <h1 class='logIn'>
                    מלא כמה פרטים
                </h1>
                <input type="text" placeholder="אימייל" onChange={(e) => { setNewUser({ ...newUser, ...{ email: e.target.value } }); }}></input><br />
                <input type="password" placeholder="סיסמא" onChange={(e) => { setNewUser({ ...newUser, ...{ password: e.target.value } }); }}></input><br />
                <div class="properties">
                    <div class='details'>
                        <label> שנת לידה </label>
                        <input class='birthYear' id="ages" onChange={(e) => { setNewUser({ ...newUser, ...{ "age": e.target.value } }); }}></input>
                    </div>
                    <div class='details'>
                        <label>מין</label>
                        <select name="genders" id="genders" onChange={(e) => { setNewUser({ ...newUser, ...{ "gender": e.target.value } }); }}>
                            {genders.map((gender) => { return (<option value={gender.genderID}>{gender.gender}</option>) })}
                        </select>
                    </div>

                    <div class='details'>
                        <label>אזור מגורים</label>

                        <select name="areas" id="areas" onChange={(e) => { setNewUser({ ...newUser, ...{ "area": e.target.value } }); }}>
                            {areas.map((area) => { return (<option value={area.areaID}>{area.area}</option>) })}
                        </select>
                    </div>
                    <div class='details'>
                        <label>מגזר</label>

                        <select name="sectors" id="sectors" onChange={(e) => { setNewUser({ ...newUser, ...{ "sector": e.target.value } }); }}>
                            {sectors.map((sector) => { return (<option value={sector.sectorID}>{sector.sector}</option>) })}
                        </select>

                    </div>
                </div>
                <div class='submitBtn'>
                    <button class='logInBtn' onClick={sign}>היכנס</button><br></br>
                    <button class='logInBtn' onClick={() => { navigate("/") }}>משתמש קיים</button>
                </div>
            </div >
        </div>
    );
}

export default SignUp;
