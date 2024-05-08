import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import ExpensesDisplay from './components/ExpensesDisplay'
import Expenses from './components/Expenses'

function App() {

  const [totalExpenses, setTotalExpenses] = useState(0)

  return (
    <>
      <Header />
      <ExpensesDisplay setTotalExpenses = { setTotalExpenses } totalExpenses = { totalExpenses }/>
      <Expenses setTotalExpenses = { setTotalExpenses } totalExpenses = { totalExpenses }/>
    </>
  )
}

export default App
