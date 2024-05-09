import "./ExpensesDisplay.css"
import { CiMenuKebab } from "react-icons/ci";
import { IconContext } from "react-icons";
import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

function ChangeLimit( props ) {
    
    const { setChangeLimitDisplay, setLimit } = props

    function updateInputInfos() {
        setLimit(parseFloat(document.getElementById("inp-change-limit").value));
    }


    return(
        <div className="new-item-bg">
        <div className="create-element-container">
            <button className="options-close-btn" onClick={() => setChangeLimitDisplay(false)}><IconContext.Provider value={{ size: "25px" }}><IoIosClose /></IconContext.Provider></button>
            <div className="input-container">
                <input type="number" onChange={updateInputInfos} placeholder="Insira o novo limite" id="inp-change-limit" />
            </div>
            <button className="confirm-btn" onClick={() => setChangeLimitDisplay(false)}>Mudar</button>
        </div>
    </div>
    )
}

function AddExpense( props ) {
    
    const { setAddExpenseDisplay, totalExpenses, setTotalExpenses } = props
    const [newExpense, setNewExpense] = useState(0)

    function updateInputInfos() {
        setNewExpense(parseFloat(document.getElementById("inp-add-expense").value));
    }


    return(
        <div className="new-item-bg">
        <div className="create-element-container">
            <button className="options-close-btn" onClick={() => setAddExpenseDisplay(false)}><IconContext.Provider value={{ size: "25px" }}><IoIosClose /></IconContext.Provider></button>
            <div className="input-container">
                <input type="number" onChange={updateInputInfos} placeholder="Insira o valor da despesa" id="inp-add-expense" />
            </div>
            <button className="confirm-btn" onClick={() => {
                setTotalExpenses(totalExpenses + newExpense)
                setAddExpenseDisplay(false)
            }}>Mudar</button>
        </div>
    </div>
    )
}


function useOutsideClick(ref, optionChange) {
    useEffect(() => {
        function handleClickOutside(event) {
            if(ref.current && !ref.current.contains(event.target)) {
                optionChange(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])
}

function ExpensesDisplay( props ) {

    const [displayOptions, setDisplayOptions] = useState(false)
    const [changeLimitDisplay, setChangeLimitDisplay] = useState(false)
    const [addExpenseDisplay, setAddExpenseDisplay] = useState(false)

    const [limit, setLimit] = useState(300)

    const [displayBar, setDisplayBar] = useState(0)

    const { totalExpenses, setTotalExpenses } = props


    useEffect(() => {
        setDisplayBar(totalExpenses/limit * 100)
        

        if(displayBar === 0) {
            document.getElementById("expenses-display").style.backgroundColor = "#1EA52B"
            document.getElementById("display-bar").style.setProperty("--bar-color", "-407px 0 0 400px #ccc")
            document.getElementById("display-bar").style.backgroundColor = "#ccc"
        } else if(displayBar <= 50 ) {
            document.getElementById("expenses-display").style.backgroundColor = "#1EA52B"
            document.getElementById("display-bar").style.setProperty("--bar-color", "-407px 0 0 400px #00590f")
            document.getElementById("display-bar").style.backgroundColor = "#ccc"
        } else if(displayBar < 85) {
            document.getElementById("expenses-display").style.backgroundColor = "#dea711"
            document.getElementById("display-bar").style.setProperty("--bar-color", "-407px 0 0 400px #ff821b")
            document.getElementById("display-bar").style.backgroundColor = "#ccc"
        } else if(displayBar >= 85 && displayBar < 100) {
            document.getElementById("expenses-display").style.backgroundColor = "#e32d15"
            document.getElementById("display-bar").style.setProperty("--bar-color", "-407px 0 0 400px #ae2716")
            document.getElementById("display-bar").style.backgroundColor = "#ccc"
        }
        else if(displayBar >= 100) {
            document.getElementById("display-bar").style.backgroundColor = "#ae2716"
            document.getElementById("display-bar").style.setProperty("--bar-color", "-407px 0 0 400px #ae2716")
            document.getElementById("expenses-display").style.backgroundColor = "#e32d15"
        }
    })

    const wrapperRef = useRef(null)
    useOutsideClick(wrapperRef, setDisplayOptions)

    return(
        <div className="expenses-container" >
            <div className="expenses-display" id="expenses-display">
                <div className="users-expenses">
                    <div className="money-display">
                        <h1 className="currently-expenses">R$ {totalExpenses.toFixed(2)}</h1>
                        <h3 className="limit">/R$ {limit.toFixed(2)}</h3>
                    </div>
                    <input id="display-bar" className="display-bar" type="range" min="0" value={displayBar} ></input>
                </div>
                <div className="expenses-display-options-container">
                    {(!displayOptions) ? <button id="option-button" onClick={() => {if(!displayOptions) {setDisplayOptions(true)}}}>
                        <IconContext.Provider value={{ className: "options-icon", size: "30px", }}>
                            <CiMenuKebab />
                        </IconContext.Provider>
                    </button> : <button id="option-button" onClick={() => {if(!displayOptions) {setDisplayOptions(true)}}} disabled>
                        <IconContext.Provider value={{ className: "options-icon", size: "30px", }}>
                            <CiMenuKebab />
                        </IconContext.Provider>
                    </button>}

                    {displayOptions && <div className="optionsContainer" ref={wrapperRef}>
                        <div className="option" onClick={() => {setChangeLimitDisplay(true); setDisplayOptions(false)}}><p>Mudar limite</p></div>
                        <span></span> 
                        <div className="option" onClick={() => {setAddExpenseDisplay(true); setDisplayOptions(false)}}><p>Adicionar valor de despesa</p></div>
                    </div>}

                </div>
            </div>
            {changeLimitDisplay === true && <ChangeLimit setChangeLimitDisplay = { setChangeLimitDisplay } setLimit = { setLimit }/>}
            {addExpenseDisplay === true && <AddExpense setAddExpenseDisplay = { setAddExpenseDisplay } totalExpenses = { totalExpenses } setTotalExpenses ={ setTotalExpenses } />}
        </div>
    )
}

export default ExpensesDisplay