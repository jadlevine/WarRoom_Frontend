import { UpdateCountry } from "../services/CountryService"
import { UpdateGame } from "../services/GameService"

const MoralePenaltyModal = ({onClose, countries, advanceToNextRound}) => {

  const calculateStressAfterMoralePenalty = (country) => {
    const stress = country.stressLevel
    const penalty = calculateAdditionalMoralePenalty(country)
    const trigger = country.moraleTriggerPoint
    return stress - penalty*trigger
  }

  const calculateAdditionalMoralePenalty = (country) => {
    let penalty = 0
    let stress = country.stressLevel
    const trigger = country.moraleTriggerPoint
    while(stress > trigger) {
      penalty++
      stress -= trigger
    }
    // country.moralePenalty = penalty
    return penalty
  }

  const applyMPsAndAdvance = () => {
    console.log("applyMPs requested")
    // this needs to send country updates in with new stress, MP?, etc...
    countries.forEach(country => {
      let countryRequest = {
        id: country.id, // never updated, but used to find country record on backend
        casualtyTotalValue: country.casualtyTotalValue,
        stressLevel: country.stressLevel, 
        medalCount: country.medalCount,
        consumerGoodsCount: country.consumerGoodsCount,
        moralePenalty: country.moralePenalty
      }
      countryRequest.moralePenalty += calculateAdditionalMoralePenalty(country)
      countryRequest.stressLevel = calculateStressAfterMoralePenalty(country)

      UpdateCountry(countryRequest)
    });

    // needs to update game data object (battlePhase, moralePhase, roundNum)...
    advanceToNextRound()
    // needs to update state of game (or just trigger fetchGame?)
  }

  return (
    <div id="morale-penalty-modal" className="container">
      <div id="mp-modal-data">
        <div id="mp-modal-row-titles">
          <div>MP = Morale Penalty</div>
          <div>MP total</div>
          <div>Current Stress Level</div>
          <div>MP/Stress Trigger Point</div>
          <div className="bold">Additional MP</div>
          <div>Stress Level After MP</div>
        </div>
        {countries.map((country) => (
          <div key={country.name} className={`mp-modal-country-${country.gameIndex}`}>
            <div>{country.name}</div>
            <div>{country.moralePenalty}</div>
            <div>{country.stressLevel}</div>
            <div>{country.moraleTriggerPoint}</div>
            <div className="bold">{calculateAdditionalMoralePenalty(country)}</div>
            <div>{calculateStressAfterMoralePenalty(country)}</div>
          </div>
        ))}
      </div>
      <div id="mp-modal-buttons">
        <button onClick={applyMPsAndAdvance}>Apply MPs and Advance to next round</button>
        <button onClick={onClose}>Go Back</button>
      </div>
    </div>
  )
}

export default MoralePenaltyModal