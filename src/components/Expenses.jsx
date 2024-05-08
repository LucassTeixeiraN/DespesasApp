import "./Expenses.css"
import { useState } from "react";
import { Items } from "./Items";

function Expenses( props ) {
    const [numberOfExpenses, setNumberOfExpenses] = useState(0)
    const [buttonPressed, setButtonPressed] = useState(false) 

    const { setTotalExpenses, totalExpenses } = props

    return(
        <div className="expenses-container">
            <div className="expenses">
                <span className="stroke"></span>

                <button className="add-btn" onClick={() => {
                    setNumberOfExpenses(numberOfExpenses + 1)
                    setButtonPressed(true)
                    
                    }}>Adicionar</button>
                <Items buttonPressed = { buttonPressed } setButtonPressed = { setButtonPressed } numberOfExpenses = { numberOfExpenses } setNumberOfExpenses = { setNumberOfExpenses } setTotalExpenses = { setTotalExpenses } totalExpenses = { totalExpenses }/>
            </div>
        </div>
    )
}

export default Expenses;