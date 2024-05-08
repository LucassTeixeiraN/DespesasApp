import "./Expenses.css"

import { useState } from "react";
import { NewItem } from "./NewItem";
import { Item } from "./Item";

export function Items(props) {

    const { numberOfExpenses, buttonPressed, setButtonPressed, setTotalExpenses, totalExpenses } = props;
    const [expenses, setExpenses] = useState([]);

    return (
        <>
            <div className="items">
                {numberOfExpenses === 0 && <h3 className="noitems">Nenhuma despesa</h3>}
                {expenses.length > 0 && <Item expenses={expenses} totalExpenses = { totalExpenses } setTotalExpenses = { setTotalExpenses }/>}
            </div>
            {buttonPressed === true && <NewItem itemId={numberOfExpenses} setButtonPressed={setButtonPressed} expenses={expenses} setExpenses={setExpenses} setTotalExpenses = { setTotalExpenses } totalExpenses = { totalExpenses }/>}
        </>
    );
}
