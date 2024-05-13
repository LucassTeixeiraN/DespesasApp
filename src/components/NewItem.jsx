import "./Expenses.css"

import { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosClose } from "react-icons/io";

export function NewItem(props) {

    const { itemId, setItemId, setButtonPressed, expenses, setExpenses, setTotalExpenses, totalExpenses, numberOfExpenses, setNumberOfExpenses } = props;

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
                        setButtonPressed(false);
                        if(inpCost === undefined || inpCost === '') {
                            setTotalExpenses(totalExpenses + 0)
                            setExpenses([...expenses, { id: itemId, cost: 0, itemName: inpItemName }]);
                        } else {
                            setTotalExpenses(totalExpenses + parseFloat(inpCost))
                            setExpenses([...expenses, { id: itemId, cost: inpCost, itemName: inpItemName }]);
                        }

                        setItemId(itemId + 1)
                        setNumberOfExpenses(numberOfExpenses + 1)
                    }}>Adicionar</button>
            </div>
        </div>
    );
}
