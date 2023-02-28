import { useEffect, useState } from "react"
import Casualty from "./Casualty"
import { UpdateCountry } from "../services/CountryService"

const Country = ({country, game, setFetchGame}) => {

  const [casualtyTotal, setCasualtyTotal] = useState(country.casualtyTotalValue)

  let casualtyTypes = [
    {"unitType": "Infantry","value":2},
    {"unitType": "Artillery","value":2},
    {"unitType": "Armor","value":4},
    {"unitType": "Fighter Plane","value":4},
    {"unitType": "Bomber Plane","value":6},
    {"unitType": "Sub","value":6},
    {"unitType": "Cruiser","value":10},
    {"unitType": "Aircraft Carrier","value":20},
    {"unitType": "Battleship","value":20}
  ]
  if (country.name === "China"){
    casualtyTypes = [
      {"unitType": "Infantry","value":2},
      {"unitType": "Artillery","value":2}
    ]
  }

  const calculateStressAfterMoralePenalty = () => {
    const stress = country.stressLevel
    const penalty = country.moralePenalty
    const trigger = country.moraleTriggerPoint
    return stress - penalty*trigger
  }

  const calculateMoralePenalty = () => {
    let penalty = 0
    const stress = country.stressLevel
    const trigger = country.moraleTriggerPoint
    while(stress > trigger) {
      penalty++
      stress -= trigger
    }
    country.moralePenalty = penalty
  }

  const handleClick = async (increaseOrDecrease, field) => {
    // e.preventDefault()
    
    // YOU ARE HERE //
    // this is broken now :(

    console.log(`${increaseOrDecrease} ${field}`)
    if (increaseOrDecrease === "increase") {
      console.log(country[field])
      country[field]++
      console.log(country[field])
    } else if (increaseOrDecrease === "decrease") {
      console.log(country[field])
      country[field]--
      console.log(country[field])
    }

    // YOU ARE HERE //
    //update the db
    let res = await UpdateCountry(country)
    //upon successful db update, update the dom
    setFetchGame(true)
  }


  return (
    <div>
      {!country ? (
        <div>
          <h2>Fetching Country Data</h2>
        </div>
      ) : (
        <div className="country-container container">
          <div className="country-summary">
            <h3>{country.name}</h3>
            <div className="border">
              <div>Stress</div>
              <div>{country.stressLevel}</div>
              <div>
                <button onClick={() => handleClick("increase", "stressLevel")}>+</button>
                <button onClick={() => handleClick("decrease", "stressLevel")}>-</button>
              </div>
            </div>
            <div className="border">
              <div>Medals</div>
              <div>{country.medalCount}</div>
              <div>
                <button onClick={() => handleClick("increase", "medalCount")}>+</button>
                <button onClick={() => handleClick("decrease", "medalCount")}>-</button>
              </div>
            </div>
            <div className="border">
              <div>Consumer Goods</div>
              <div>{country.consumerGoodsCount}</div>
              <div>
                <button onClick={() => handleClick("increase", "consumerGoodsCount")}>+</button>
                <button onClick={() => handleClick("decrease", "consumerGoodsCount")}>-</button>
              </div>
            </div>
            <div className="border">
              <div>Morale Penalty</div>
              <div>{country.moralePenalty}</div>
              <div>Stress After Morale Penalty: {calculateStressAfterMoralePenalty()}</div>
              <div>Morale Trigger Point: {country.moraleTriggerPoint}</div>
            </div>
          </div>
          <div className="casualty-tracker">
            <div>Total Casualty Points: {casualtyTotal}</div>
            {casualtyTypes.map((type) => (
              <Casualty key={type.unitType} casualty={type} setCasualtyTotal={setCasualtyTotal} casualtyTotal={casualtyTotal} game={game} country={country} setFetchGame={setFetchGame}/>
            ))}
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Country