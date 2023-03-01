import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetGame } from '../services/GameService'
import Country from '../components/Country'
import CasualtyToStressConversionChart from '../components/CasualtyToStressConversionChart'
import { UpdateCountry } from '../services/CountryService'
import { UpdateGame } from '../services/GameService'

const Game = () => {
  // to do: does it make sense to only keep game specific fields in the game useState? i.e., not keeping nested country and casualty lists? chrome dev tools inspecting components is sluggist. perhaps it's because game useState is holding too much data.
  // if this is changed, (at least) countries and (probably also) casualties would need to be making their own backend get requests and maintaining their respective useStates.

  let { game_id } = useParams()

  const [game, setGame] = useState({})
  const [fetchGame, setFetchGame] = useState(true)
  const [casualtyReset, setCasualtyReset] = useState(false)

  const getGameDetails = async () => {
    const response = await GetGame(game_id)
    setGame(response)
  }

  const endBattlePhase = () => {
    // conversion values to be used to convert casualty points to stress points
    const conversionValues = [
      [0, 0, 18],
      [1, 20, 34],
      [2, 36, 50],
      [3, 52, 68],
      [4, 70, 88],
      [5, 90, 108],
      [6, 110, Number.MAX_SAFE_INTEGER]
    ]

    // for each country, convert casualty to stress, and then sned update request to back end
    for (let country of game.countries) {
      // compute casualty to stress conversion
      let casualty = country.casualtyTotalValue
      let addedStress = -1
      conversionValues.forEach((conversion) => {
        if (casualty >= conversion[1] && casualty <= conversion[2]) {
          addedStress = conversion[0]
        }
      })
      // error catching for development only
      if (addedStress < 0 || addedStress > 6) {
        window.alert('invalid casualty to stress conversion')
        return
      }

      let countryRequest = {
        id: country.id, // never updated, but used to find country record on backend
        casualtyTotalValue: 0, // UPDATED
        stressLevel: country.stressLevel + addedStress, // UPDATED
        medalCount: country.medalCount, // not updated here
        consumerGoodsCount: country.consumerGoodsCount, // not updated here
        moralePenalty: country.moralePenalty // not updated here
      }

      // send update country request to backend
      UpdateCountry(countryRequest)
    } // end of country for loop

    // Game updates
    let gameRequest = {
      id: game.id, // never updated, but used to find game record on backend
      roundNum: game.roundNum, // not updated here
      battlePhase: false, // UPDATED
      moralePhase: true // UPDATED
    }
    // send update game request to backend
    UpdateGame(gameRequest)

    // refresh the data, clean-up and re-render the UI
    setCasualtyReset(true)
    setFetchGame(true)
  } // end of endBattlePhase

  const endMoralePhase = () => {
    game.battlePhase = true
    game.moralePhase = false
    game.roundNum++
    UpdateGame(game)
    setFetchGame(true)
  }

  useEffect(() => {
    getGameDetails()
    setFetchGame(false)
  }, [fetchGame])

  return (
    <div>
      {!game ? (
        <div>
          <h2>Fetching Game Data</h2>
        </div>
      ) : (
        <div>
          <div id="game-details-container" className="container">
            <div className="game-summary">
              <div className="header">Game Info</div>
              <div className="game-summary-info">
                <div className="right-align">Game ID:</div>
                <div className="left-align">{game.id}</div>
                <div className="right-align">Game Title:</div>
                <div className="left-align">{game.name}</div>
                <div className="right-align">Scenario:</div>
                <div className="left-align">{game.scenario}</div>
                {/* <div>Created At:</div><div>{game.date}</div> */}
              </div>
            </div>
            <div className="round-tracker">
              <div className="header">Round</div>
              <div id="roundNum" className="xx-large">
                {game.roundNum}
              </div>
            </div>
            <div className="phase-tracker">
              <div className="header">Phase</div>
              <div className="phase-track">
                {game.battlePhase ? (
                  <div className="xx-large">BATTLE</div>
                ) : game.moralePhase ? (
                  <div className="xx-large">MORALE</div>
                ) : (
                  <div>No Phase Selected</div>
                )}
              </div>
              {game.battlePhase ? (
                <button id="end-battle-button" onClick={endBattlePhase}>
                  End Battle Phase
                </button>
              ) : (
                <button disabled id="end-battle-button">
                  End Battle Phase
                </button>
              )}
              {game.moralePhase ? (
                <button id="end-morale-button" onClick={endMoralePhase}>
                  End Morale Phase
                </button>
              ) : (
                <button disabled id="end-morale-button">
                  End Morale Phase
                </button>
              )}
            </div>
          </div>
          <CasualtyToStressConversionChart countries={game.countries} />
          <div id="countries">
            {game.countries?.map((country) => (
              <Country
                key={country.id}
                country={country}
                roundNum={game.roundNum}
                battlePhase={game.battlePhase}
                moralePhase={game.moralePhase}
                setFetchGame={setFetchGame}
                casualtyReset={casualtyReset}
                setCasualtyReset={setCasualtyReset}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
