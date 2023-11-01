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
import ReportedSurvey from "./components/ReportedSurvey"
import AllSurveys from "./components/AllSurveys"
import { Link, useNavigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Router>
      <Routes>
         <Route path="/" element={<Navigate replace to="/LogIn" />} />
         <Route path='/LogIn/' element={<LogIn />}></Route>
         <Route path="home/" element={<Home />} />
         <Route path="home/mySurveys/" element={<MySurveys />} />
         <Route path="managerPage/" element={<ManagerPage />}/>
         <Route path="manager/reportedSurvey/:id/" exact element={<ReportedSurvey />}></Route>
         <Route path="manager/allSurveys" element={<AllSurveys />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
