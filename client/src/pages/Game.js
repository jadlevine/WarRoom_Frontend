import { useParams } from 'react-router-dom'

const Game = () => {
  let { game_id } = useParams()

  return (
    <div>
      <h2>Game</h2>
      <h3>ID: {game_id}</h3>
    </div>
  )
}

export default Game
