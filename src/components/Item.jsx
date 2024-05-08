import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import "./Expenses.css"

import { IconContext } from "react-icons";
import { IoMdTrash, IoMdCreate } from "react-icons/io";

function ChangeExpense( props ) {
    
    const { expenses, setChangeExpenseDisplay, currentItem, totalExpenses, setTotalExpenses } = props

    const [CostHandle, setCostHandle] = useState()
    const [NameHandle, setNameHandle] = useState()

    function updateInputInfos() {
        setCostHandle(document.getElementById("inp-new-cost").value);
        setNameHandle(document.getElementById("inp-item-new-name").value);
    }

    return(
        <div className="new-item-bg">
            <div className="create-element-container">
                <button className="close-btn" onClick={() => setChangeExpenseDisplay(false)} ><IconContext.Provider value={{ size: "25px" }}><IoIosClose /></IconContext.Provider></button>
                <div className="input-container">
                    <input type="number" onChange={updateInputInfos} placeholder="R$" id="inp-new-cost" />
                    <input type="text" onChange={updateInputInfos} placeholder="Nome da despesa" id="inp-item-new-name" />
                </div>
                <button className="confirm-btn"
                    onClick={() => {
                        setTotalExpenses(totalExpenses - expenses[currentItem-1].cost + parseFloat(CostHandle))

                        expenses[currentItem-1].cost = CostHandle
                        expenses[currentItem-1].itemName = NameHandle
                        setChangeExpenseDisplay(false)
                    }}>Alterar</button>
            </div>
        </div>
    )
}


export function Item(props) {
    const { expenses, totalExpenses, setTotalExpenses } = props;
    
    const [changeExpenseDisplay, setChangeExpenseDisplay] = useState(false)
    const [currentItem, setCurrentItem] = useState()

    function deleteItem(index) {
        console.log(expenses.indexOf(expenses[index]));
        setTotalExpenses(totalExpenses - parseFloat(expenses[index].cost))
        expenses.splice(expenses.indexOf(expenses[index]), 1)

    }

    return (

        <div className="item-container" id = "item-container">
            {expenses.map((el) => <div key={el.id} id = {el.id} className="expense-item">
                <div className="item">
                    <div className="content-container">
                        <p>R${parseFloat(el.cost).toFixed(2)}</p>
                        <div></div>
                        <p>{el.itemName}</p>
                    </div>
                    <div className="buttons-container">
                        <div className="edit-btn" onClick={() => {setChangeExpenseDisplay(true); setCurrentItem(el.id)}}><IconContext.Provider value={{ size: "25px" }}><IoMdCreate></IoMdCreate></IconContext.Provider></div>
                        <div className="delete-btn" onClick={() => {
                            deleteItem(el.id - 1)

                            console.log(expenses)
                        }}><IconContext.Provider value={{ size: "25px" }}><IoMdTrash></IoMdTrash></IconContext.Provider></div>
                    </div>
                </div>
                <button onClick={() => console.log(expenses)}>a</button>
                <div className="hl"></div>
            </div>)}
            {changeExpenseDisplay && <ChangeExpense expenses = { expenses } setChangeExpenseDisplay = { setChangeExpenseDisplay } currentItem = { currentItem } totalExpenses = { totalExpenses } setTotalExpenses = { setTotalExpenses }/>}
        </div>
    );
}
