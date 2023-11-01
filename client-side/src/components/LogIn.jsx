import React, { useState, useEffect } from 'react'
import ManagerORUser from './ManagerORUser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import image from "../logo.jpg"
function LogIn() {

  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassward, setUserPassward] = useState("");
  const [isManager, setIsManager] = useState(false);
  const log = async () => {
    if (userEmail == "" || userPassward == "") {
      alert("חובה למלא את כל הפרטים!");
      return;
    }
    if (!isEmailValid()) {
      alert("כתובת האימייל אינה תקינה");
      return;
    }
    let login = await fetch("http://localhost:3569/users/logIn", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail, password: userPassward })
    });
    login = await login.json();
    if (login) {
      sessionStorage.setItem("userCode", login[0].userCode);
      if (login[0].manager == 1) {
        setIsManager(true);
      }
      else {
        navigate("/home")
      }
    }
    else {
      alert("משתמש לא קיים או שאחד הפרטים שגויים ");
    }
  }

  const isEmailValid = () => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(userEmail.toLowerCase());
  };

  return (

    <div>
      <h1 class='webTitle'>סקרים</h1>
      <img src={image}/>
      <div class='logInBox'>
        <h1 class='logIn'>
          משתמש קיים
        </h1>
        <input type="text" placeholder="הכנס כתובת אימייל" onChange={(event) => { setUserEmail(event.target.value); }}></input><br />
        <input type="password" placeholder="הכנס סיסמא" onChange={(event) => { setUserPassward(event.target.value); }}></input><br />
        <br></br>
        {!isManager && <div class='submitBtn'>
          <button id='logInBtn' class='logInBtn' onClick={log}>היכנס</button>
          <button class='logInBtn' onClick={() => { navigate("/signUp") }}>משתמש חדש</button>
        </div>}
        {
          isManager && <ManagerORUser />
        }

      </div>
    </div>
  );
}

export default LogIn;










