import React from 'react'
import ExactDetails from "./ExactDetails"
function SortByProperty(props) {
    return (
        <div >
            <ExactDetails question={props.question} questionResults={props.questionResults} />
        </div>
    );
}

export default SortByProperty;
