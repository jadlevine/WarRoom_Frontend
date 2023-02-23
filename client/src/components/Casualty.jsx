import { useState } from "react"


const Casualty = ({casualty, casualtyTotal, setCasualtyTotal}) => {

  const [count, setCount] = useState(0)
  

  const addCasualty = () => {
    // call db to add (need unitType and roundOccurred, and countryId)
    setCount(count+1)
    // update total Casualty Points
    setCasualtyTotal(casualtyTotal + casualty.value)
    //send updated casualtyTotalValue to db for country
  }
  const removeCasualty = () => {
    // call db to delete (find most recent of country and unitType)
    setCount(count-1)
    // update total Casualty Points
    setCasualtyTotal(casualtyTotal - casualty.value)
  }


  return (
    <div className="casualty-box">
      <div>{casualty.unitType}</div>
      <div>Points: {casualty.value}</div>
      <div>Number Sustained: {count}</div>
      <button onClick={() => addCasualty()}>+</button>
      <button disabled={count === 0} onClick={() => removeCasualty()}>-</button>
      
    </div>
  )
}

export default Casualty