import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import { useEffect } from "react";
import image from "../logo.jpg"
function ManagerORUser() {
    let navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem("userCode"))
            navigate("/");
    }, [])

    return (
        <div>
        <div class='nav' >
            <button class='navLinks linkBtn' onClick={() => { navigate("/home/") }}>היכנס כמשתמש</button>
            <button class='navLinks linkBtn' onClick={() => { navigate("/managerPage") }}>ראשי</button>
            <button class='navLinks linkBtn' onClick={() => { navigate("/manager/allSurveys/") }}>כל הסקרים</button>
            <button class='navLinks linkBtn' onClick={() => { sessionStorage.clear(); navigate("/") }}>יציאה</button>
        </div>
        <img src={image}/>
        </div>
    );
}

export default ManagerORUser;
