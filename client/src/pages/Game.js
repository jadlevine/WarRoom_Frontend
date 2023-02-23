import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetGame } from '../services/GameService'
import Country from '../components/Country'

const Game = () => {
  let { game_id } = useParams()

  const [game, setGame] = useState({})
  const [fetchGame, setFetchGame] = useState(true)

  const getGameDetails = async () => {
    const game = await GetGame(game_id)
    // let countryArr = []

    // console.log(game.countries)
    // console.log(typeof game.countries)
    setGame(game)
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
          <div id="game-details">
            <h2>Game Details</h2>
            <div>Game ID: {game.id}</div>
            <div>Name: {game.name}</div>
            <div>Created At: {game.date}</div>
            <div>Scenario: {game.scenario}</div>
            <br></br>
            <div>
              <div>Round</div>
              <div id="roundNum">{game.roundNum}</div>
            </div>
            <div>
              <div>Phase</div>
              <div>
                <div id="battle">
                  Battle: {game.battlePhase ? 'true' : 'false'}
                </div>
                <div id="morale">
                  Morale: {game.moralePhase ? 'true' : 'false'}
                </div>
              </div>
            </div>
          </div>
          <div id="countries">
            {game.countries.map((countryData) => (
              <Country key={countryData.id} countryData={countryData} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
