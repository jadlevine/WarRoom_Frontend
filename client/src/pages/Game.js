import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetGame } from '../services/GameService'
import Country from '../components/Country'
import CasualtyToStressConversionChart from '../components/CasualtyToStressConversionChart'

const Game = () => {
  let { game_id } = useParams()

  const [game, setGame] = useState({})
  const [fetchGame, setFetchGame] = useState(true)

  const getGameDetails = async () => {
    const response = await GetGame(game_id)
    setGame(response)
  }

  const endBattlePhase = () => {
    console.log('battle phase end requested')
    // maybe give a popup confirm button, to let user know what happens (confirm to convert casualty points to stress points ... then, it happening "automatically" won't be as confusing)

    // for each country,
    // // front end
    // convert casualty points to stress points
    // increase stress level
    // Set Total Casualty Points = 0
    // // this SHOULD automatically reset the flags/country names to 0 on the StressToCasualtyConversionChart
    // set number sustained for each casualty type = 0
    // // backend
    // send a put request to update the country

    //once all countries are updated, setFetchGame(true) to grab updated details from backend
  }
  const endMoralePhase = () => {
    console.log('morale phase end requested')
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
                game={game}
                setFetchGame={setFetchGame}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
