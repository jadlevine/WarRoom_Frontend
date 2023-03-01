import { useState, useEffect } from "react"
import { AddNewCasualty, DeleteCasualty } from "../services/CasualtyService"

const Casualty = ({casualty, casualtyRoundTotal, setCasualtyRoundTotal, roundNum, battlePhase, moralePhase, country, setFetchGame, casualtyReset, setCasualtyReset}) => {

  const [count, setCount] = useState(0)
  

  const addCasualty = async () => {
    setCount(count+1)

    // update total Casualty Points
    setCasualtyRoundTotal(casualtyRoundTotal + casualty.value)

    // send post request to backend
    let response = await AddNewCasualty(casualty.unitType, country.id, roundNum)
    
    // refresh the data, re-render the UI
    setFetchGame(true)
  }

  const removeCasualty = async () => {
    setCount(count-1)
  
    // update total Casualty Points
    setCasualtyRoundTotal(casualtyRoundTotal - casualty.value)

    // send delete request to backend
    let response = await DeleteCasualty(casualty.unitType, country.id)

    // refresh the data, re-render the UI
    setFetchGame(true)
  }

useEffect(() => {
  setCount(0)
  setCasualtyReset(false)

}, [casualtyReset])

  return (
    <div className="border">
      <div>{casualty.unitType}</div>
      <div>Points: {casualty.value}</div>
      <div>Number Sustained: {count}</div>
      <button disabled={!battlePhase} onClick={() => addCasualty()}>+</button>
      <button disabled={count === 0 || !battlePhase} onClick={() => removeCasualty()}>-</button>
      
    </div>
  )
}

export default Casualty