import { useState, useEffect } from 'react'
import { GetAllGames } from '../services/GameService'
import { useNavigate } from 'react-router-dom'

const GameList = ({newGameAdded, setNewGameAdded}) => {
  let navigate = useNavigate()

  const [games, setGames] = useState([])

  const getGames = async () => {
    const response = await GetAllGames()
    setGames(response)
  }

  useEffect(() => {
    getGames()
    setNewGameAdded(false)
  }, [newGameAdded])

  const navigateToGame = (game_id) => {
    navigate(`/games/${game_id}`)
  }

  return (
    <div>
      <h3>
        GameList
      </h3>
      <div id="game-listings">
        {games.map((game) => (
          <div className="game-list-item clickable" key={game.id} onClick={() => navigateToGame(game.id)}>
            <br></br>
            <div>Title: {game.name}</div>
            <div>Scenario: {game.scenario}</div>
            <div>Date: {game.date}</div>
            <div>Current Round: {game.roundNum}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameList