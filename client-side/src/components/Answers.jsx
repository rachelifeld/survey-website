import { useState, useEffect } from "react";
import React from 'react'
function Answers(props) {
    let answers = props.answers;

    return (
        <div class='fillingQuestion'>

            {answers.map((answer) => {
                return (
                    <div class='answers'>
                        <input
                            type="radio"
                            id={answer.answerCode}
                            value={answer.answerCode}
                            name={answer.questionCode}
                            onChange={(e) => { e.target.checked && props.setQuestion(e.target.name, e.target.value) }}
                        />
                        <label>{answer.answer}</label>
                    </div>
                )
            })}

        </div>
    );
}

export default Answers;

