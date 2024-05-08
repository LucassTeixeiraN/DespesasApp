import "./Expenses.css"

import { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosClose } from "react-icons/io";

export function NewItem(props) {

    const { itemId, setButtonPressed, expenses, setExpenses, setTotalExpenses, totalExpenses } = props;

    const [inpCost, setInpCost] = useState();
    const [inpItemName, setInpItemName] = useState();

    function updateInputInfos() {
        setInpCost(document.getElementById("inp-cost").value);
        setInpItemName(document.getElementById("inp-item-name").value);
    }

    return (
        <div className="new-item-bg">
            <div className="create-element-container">
                <button className="close-btn" onClick={() => setButtonPressed(false)}><IconContext.Provider value={{ size: "25px" }}><IoIosClose /></IconContext.Provider></button>
                <div className="input-container">
                    <input type="number" onChange={updateInputInfos} placeholder="R$" id="inp-cost" />
                    <input type="text" onChange={updateInputInfos} placeholder="Nome da despesa" id="inp-item-name" />
                </div>
                <button className="confirm-btn"
                    onClick={() => {
                        setInpCost(document.getElementById("inp-cost").value);
                        setInpItemName(document.getElementById("inp-item-name").value);
                        setButtonPressed(false);

                        setTotalExpenses(totalExpenses + parseFloat(inpCost))
                        setExpenses([...expenses, { id: itemId, cost: inpCost, itemName: inpItemName }]);
                    }}>Adicionar</button>
            </div>
        </div>
    );
}
