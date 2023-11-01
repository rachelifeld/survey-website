import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import ExactDetails from "./ExactDetails"
import { useNavigate } from 'react-router-dom';
import GetProperties from './GetProperties';
import UserNav from './UserNav';
function UpdateUser() {
    const [prevUser, setPrevUser] = useState({});
    const [genders, setGenders] = useState([]);
    const [areas, setAreas] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [updatedUser, setUpdatedUser] = useState({});
    let userCode = sessionStorage.getItem("userCode");
    let navigate = useNavigate();
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        let user = await fetch("http://localhost:3569/users/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userCode": userCode })
        });
        user = await user.json();
        if (user) {

            setUpdatedUser(user)
            setPrevUser(user)
            console.log("kkk");
            console.log(user);
        }
        else
            alert("שגיאה");
    }

    const updateUser = async () => {
        if (updatedUser.userEmail == "" || updatedUser.password == "" || updatedUser.age == "") {
            alert("חובה למלא את כל הפרטים!");
            return;
        }

        if (!isEmailValid()) {
            alert("כתובת האימייל אינה תקינה");
            updatedUser.userEmail = "";
            return;
        }
        if (!isBirthYearValid()) {
            alert("שנת לידה אינה תקינה");
            updatedUser.age = "";
            return;
        }
        console.log(updatedUser);
        let update = await fetch("http://localhost:3569/users/updateUser", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        update = await update.json();
        if (update)
            navigate("/home");
        else
            alert("שגיאה");
    }
    const isEmailValid = () => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        debugger;
        return pattern.test(updatedUser.userEmail.toLowerCase());
    };

    const isBirthYearValid = () => {
        const currentYear = new Date().getFullYear();
        if (updatedUser.age < currentYear - 120 || updatedUser.age > currentYear - 14) {
            return false;
        }
        return true;
    }
    return (
        <div>
            <UserNav />
            <div class='logInBox' id='signUp'>
                <GetProperties setSectors={setSectors} setAreas={setAreas} setGenders={setGenders} />
                <label className='update'>אימייל</label>
                <input type="text" defaultValue={prevUser.userEmail} onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ userEmail: e.target.value } }); }}></input><br />
                <label className='update'>סיסמא</label>
                <input type="text" defaultValue={prevUser.userPassword} onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ userPassword: e.target.value } }); }}></input><br />
                <div class="properties">
                    <div class='details'>
                        <label>מין</label>
                        <select name="genders" id="genders" onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ "genderID": e.target.value } }); }}>
                            {genders.map((gender) => {
                                if ((gender.genderID == prevUser.genderID))
                                    return (<option selected value={gender.genderID}>{gender.gender}</option>)
                                else
                                    return (<option value={gender.genderID}>{gender.gender}</option>)
                            })}
                        </select>
                    </div>
                    <div class='details'>
                        <label>שנת לידה</label>
                        <input class='birthYear' defaultValue={prevUser.birthYear} onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ "birthYear": e.target.value } }); }}></input>
                    </div>

                    <div class='details'>
                        <label>אזור מגורים</label>

                        <select name="areas" id="areas" onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ "areaID": e.target.value } }); }}>
                            {areas.map((area) => {
                                if ((area.areaID == prevUser.areaID))
                                    return (<option selected value={area.areaID}>{area.area}</option>)
                                else
                                    return (<option value={area.areaID}>{area.area}</option>)
                            })}
                        </select>
                    </div>
                    <div class='details'>
                        <label>מגזר</label>

                        <select name="sectors" id="sectors" onChange={(e) => { setUpdatedUser({ ...updatedUser, ...{ "sectorID": e.target.value } }); }}>
                            {sectors.map((sector) => {
                                if ((sector.sectorID == prevUser.sectorID))
                                    return (<option selected value={sector.sectorID}>{sector.sector}</option>)
                                else
                                    return (<option value={sector.sectorID}>{sector.sector}</option>)
                            })}
                        </select>
                    </div>
                </div>
                <br></br>
                <br></br>
                <button class='logInBtn' onClick={updateUser} >עדכון</button>
            </div>
        </div>
    );
}

export default UpdateUser;
