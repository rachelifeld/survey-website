import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LogIn from "./components/LogIn"
import Home from "./components/Home"
import MySurveys from "./components/MySurveys"
import ManagerPage from "./components/ManagerPage"
import ShowSurvey from "./components/ShowSurvey"
import AllSurveys from "./components/AllSurveys"
import SignUp from "./components/SignUp"
import ManagerNav from "./components/ManagerORUser"
import NewSurvey from './components/NewSurvey';
import UserShowSurvey from './components/UserShowSurvey';
import ManagerShowSurvey from './components/ManagerShowSurvey';
import SurveyResults from './components/SurveyResults';
import FillingSurvey from './components/FillingSurvey';
import AnsweredSurveys from './components/AnsweredSurveys';
import ExactDetails from './components/ExactDetails';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/LogIn" />} />
          <Route path='/logIn/' element={<LogIn />}></Route>
          <Route path='/signUp/' element={<SignUp />}></Route>
          <Route path="home/" element={<Home />} />
          <Route path="home/updateUser" element={<UpdateUser />} />
          <Route path="home/AnsweredSurveys" element={<AnsweredSurveys />} />
          <Route path="home/mySurveys/newSurvey/" element={<NewSurvey />}></Route>
          <Route path="home/mySurveys/" element={<MySurveys />} />
          <Route path="managerPage/" element={<ManagerPage />} />
          <Route path="showSurvey/:id/" exact element={<ShowSurvey />}></Route>
          <Route path="manager/allSurveys/" element={<AllSurveys />}></Route>
          <Route path="managerNav/" element={<ManagerNav />}></Route>
          <Route path="home/mySurveys/UserShowSurvey/:id" element={<UserShowSurvey />}></Route>
          <Route path="manager/mySurveys/ManagerShowSurvey/:id" element={<ManagerShowSurvey />}></Route>
          <Route path="home/fillingSurvey" element={<FillingSurvey />}></Route>
          <Route path="survey/:id/surveyResults" element={<SurveyResults />}></Route>
          <Route path="survey/:id/surveyResults/exactDetails" element={<ExactDetails />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

