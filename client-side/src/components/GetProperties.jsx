import React, { useState,useEffect } from 'react'
import ExactDetails from "./ExactDetails"
function GetProperties(props) {
    useEffect(() => {
        getGenders();
        getAreas();
        getSectors();
    }, []);
    const getGenders = async () => {
        let myGenders = await fetch("http://localhost:3569/properties/genders/");
        debugger;
        myGenders = await myGenders.json();
        props.setGenders(myGenders);
    }

    const getAreas = async () => {
        let myAreas = await fetch("http://localhost:3569/properties/areas/");
        debugger;
        myAreas = await myAreas.json();
        props.setAreas(myAreas);
    }
    const getSectors = async () => {
        let mySectors = await fetch("http://localhost:3569/properties/sectors/");
        debugger;
        mySectors = await mySectors.json();
        props.setSectors(mySectors);
    }
    return (
        <div >
        </div>
    );
}

export default GetProperties;