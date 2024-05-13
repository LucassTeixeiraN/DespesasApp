import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import "./Expenses.css"

import { IconContext } from "react-icons";
import { IoMdTrash, IoMdCreate } from "react-icons/io";

function ChangeExpense( props ) {
    
    const { expenses, setChangeExpenseDisplay, currentItem, totalExpenses, setTotalExpenses, expenseLengthHandle } = props
    const [newNameHandle, setNewNameHandle] = useState()
    const [newCostHandle, setNewCostHandle] = useState()

    function updateInputInfos() {
        setNewCostHandle(document.getElementById("inp-new-cost").value);
        setNewNameHandle(document.getElementById("inp-item-new-name").value);
    }

    function editItem(item) {
        for(var i = 0; i < expenseLengthHandle; i++) {
            if(expenses[i].id === item) {
                if(newCostHandle === undefined || newCostHandle === ""){
                    setTotalExpenses(totalExpenses - expenses[i].cost + 0)
                    expenses[i].cost = 0
                } else {
                    setTotalExpenses(totalExpenses - expenses[i].cost + parseFloat(newCostHandle))
                    expenses[i].cost = newCostHandle
                }
                expenses[i].itemName = newNameHandle
                setChangeExpenseDisplay(false)

            }
        }
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
                    onClick={() => editItem(currentItem)}>Alterar</button>
            </div>
        </div>
    )
}


export function Item(props) {
    const { expenses, totalExpenses, setTotalExpenses, numberOfExpenses, setNumberOfExpenses } = props;
    
    const [changeExpenseDisplay, setChangeExpenseDisplay] = useState(false)
    const [currentItem, setCurrentItem] = useState()
    const [expenseLengthHandle, setExpenseLengthHandle] = useState()

    
    useEffect(() => {
        setExpenseLengthHandle(expenses.length)
    }, [expenses])

    function deleteItem(item) {
        for(var i = 0; i < expenseLengthHandle; i++) {
            if(expenses[i].id === item) {
                setTotalExpenses(totalExpenses - parseFloat(expenses[i].cost))
                expenses.splice(i, 1)

                setNumberOfExpenses(numberOfExpenses - 1)
            }
        }
    }


        const item = expenses.map((el) => <div key={el.id} id = {el.id} className="expense-item">
        <div className="item">
            <div className="content-container">
                <p>R${parseFloat(el.cost).toFixed(2)}</p>
                <div></div>
                <p>{el.itemName}</p>
            </div>
            <div className="buttons-container">
                <div className="edit-btn" onClick={() => {
                    setChangeExpenseDisplay(true); 
                    setCurrentItem(el.id)
                
                }}><IconContext.Provider value={{ size: "25px" }}><IoMdCreate></IoMdCreate></IconContext.Provider></div>
                <div className="delete-btn" onClick={() => {deleteItem(el.id)}}><IconContext.Provider value={{ size: "25px" }}><IoMdTrash></IoMdTrash></IconContext.Provider></div>
            </div>
        </div>
        <div className="hl"></div>
    </div>)

    return (
        
        <div className="item-container" id = "item-container">
            {item}
            {changeExpenseDisplay && <ChangeExpense expenses = { expenses } setChangeExpenseDisplay = { setChangeExpenseDisplay } currentItem = { currentItem } totalExpenses = { totalExpenses } setTotalExpenses = { setTotalExpenses } expenseLengthHandle = { expenseLengthHandle } />}
        </div>
    );
}
