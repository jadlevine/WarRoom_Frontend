import { useEffect, useState } from "react"
import Casualty from "./Casualty"
import { UpdateCountry } from "../services/CountryService"

const Country = ({country, roundNum, battlePhase, moralePhase, setFetchGame, casualtyReset, setCasualtyReset}) => {

  // to do: should country component make it's own db get requests, and keep it's own country useState?
  // // or is it ok to just let the fetchGame functionality do it's job and pass country data down from game data?


  const [casualtyRoundTotal, setCasualtyRoundTotal] = useState(0)

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

  const calculateAdditionalMoralePenalty = () => {
    let penalty = 0
    const stress = country.stressLevel
    const trigger = country.moraleTriggerPoint
    while(stress > trigger) {
      penalty++
      stress -= trigger
    }
    // country.moralePenalty = penalty
    return penalty
  }

  const handleClick = async (increaseOrDecrease, field, goal) => {
    let countryRequest = {
      id: country.id, // never updated, but used to find country record on backend
      casualtyTotalValue: country.casualtyTotalValue,
      stressLevel: country.stressLevel, 
      medalCount: country.medalCount,
      consumerGoodsCount: country.consumerGoodsCount,
      moralePenalty: country.moralePenalty
    }
    if (goal === "reduceStress") {
      countryRequest[field]--
      countryRequest.stressLevel--
    } else {
      if (increaseOrDecrease === "increase") {
        countryRequest[field]++
      } else if (increaseOrDecrease === "decrease") {
        countryRequest[field]--
      }
    }


    // send update country request to backend
    UpdateCountry(countryRequest)

    // refresh the data, re-render the UI
    setFetchGame(true)
  }

  useEffect(() => {
    setCasualtyRoundTotal(0)
    setCasualtyReset(false)
  
  }, [casualtyReset])

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
                <button disabled={!battlePhase} onClick={() => handleClick("increase", "stressLevel")}>+</button>
                <button disabled={!battlePhase} onClick={() => handleClick("decrease", "stressLevel")}>-</button>
              </div>
            </div>
            <div className="border">
              <div>Medals</div>
              <div>{country.medalCount}</div>
              <div>
                <button disabled={!battlePhase} onClick={() => handleClick("increase", "medalCount")}>+</button>
                <button disabled={!battlePhase || country.medalCount === 0} onClick={() => handleClick("decrease", "medalCount")}>-</button>
                <button disabled={!moralePhase || country.medalCount === 0 || country.stressLevel === 0} onClick={() => handleClick("decrease", "medalCount", "reduceStress")}>Spend Medal to reduce Stress</button>

              </div>
            </div>
            <div className="border">
              <div>Consumer Goods</div>
              <div>{country.consumerGoodsCount}</div>
              <div>
                <button disabled={!moralePhase} onClick={() => handleClick("increase", "consumerGoodsCount")}>+</button>
                <button disabled={!moralePhase || country.consumerGoodsCount === 0} onClick={() => handleClick("decrease", "consumerGoodsCount")}>-</button>
                <button disabled={!moralePhase || country.consumerGoodsCount === 0 || country.stressLevel === 0} onClick={() => handleClick("decrease", "consumerGoodsCount", "reduceStress")}>Spend Consumer Good to reduce Stress</button>
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
            <div>Total Casualty Points: {casualtyRoundTotal}</div>
            {casualtyTypes.map((type) => (
              <Casualty
                key={type.unitType}
                casualty={type}
                setCasualtyRoundTotal={setCasualtyRoundTotal}
                 casualtyRoundTotal={casualtyRoundTotal}
                 roundNum={roundNum}
                 battlePhase={battlePhase}
                 moralePhase={moralePhase}
                 country={country}
                 setFetchGame={setFetchGame}
                 casualtyReset={casualtyReset}
                 setCasualtyReset={setCasualtyReset}
              />
            ))}
            <div></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Country