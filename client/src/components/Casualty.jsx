import { useState } from "react"
import { AddNewCasualty, DeleteCasualty } from "../services/CasualtyService"

const Casualty = ({casualty, casualtyTotal, setCasualtyTotal, game, country, setFetchGame}) => {

  const [count, setCount] = useState(0)
  

  const addCasualty = async () => {
    
    setCount(count+1)
    // update total Casualty Points
    setCasualtyTotal(casualtyTotal + casualty.value)
    // db calls
    // add new casualty (need unitType and roundOccurred, and countryId)
    let response = await AddNewCasualty(casualty.unitType, country.id, game.roundNum)
    // updated casualtyTotalValue for country // => THIS IS HANDLED ON BACKEND
    //re fetch the game (eventually, refactor to just refetch the country)
    setFetchGame(true)
  }
  const removeCasualty = async () => {
    setCount(count-1)
    // update total Casualty Points
    setCasualtyTotal(casualtyTotal - casualty.value)
    // db calls
    let response = await DeleteCasualty(casualty.unitType, country.id)
    setFetchGame(true)
    // delete casualty (find most recent of country and unitType)
    // updated casualtyTotalValue for country
  }


  return (
    <div className="summary-item">
      <div>{casualty.unitType}</div>
      <div>Points: {casualty.value}</div>
      <div>Number Sustained: {count}</div>
      <button onClick={() => addCasualty()}>+</button>
      <button disabled={count === 0} onClick={() => removeCasualty()}>-</button>
      
    </div>
  )
}

export default Casualty