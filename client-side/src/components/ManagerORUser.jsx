import React from 'react'
import ReactDOM from 'react-dom'
import Reports from "./Reports";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
function ManagerORUser() {
    let navigate = useNavigate();
    return (

        <div class='submitBtn' >
            <button id='managerBtn' class='logInBtn' onClick={() => { navigate("/managerPage/") }}>היכנס כמנהל</button>
            <button class='logInBtn' onClick={() => { navigate("/home/") }}>היכנס כמשתמש</button>
        </div>
    );
}

export default ManagerORUser;
