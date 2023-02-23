import { AddNewGame } from '../services/GameService'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GameList from '../components/GameList'

const Home = () => {
  let navigate = useNavigate()
  const initialState = {
    name: '',
    scenario: ''
  }
  const [formValues, setFormValues] = useState(initialState)
  const [newGameAdded, setNewGameAdded] = useState(false)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(`game submission requested ${formValues}`)
    const response = await AddNewGame(formValues)
    setFormValues(initialState)
    setNewGameAdded(true)
  }

  // useEffect(() => {}, [])

  return (
    <div className="page-body">
      <div>
        Welcome to War Room.<br></br> Create a game using the New Game Form, or
        choose one of the ongoing games in the Game List.
      </div>
      <div id="new-game-form">
        <h3>New Game Form</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formValues.name}
            type="text"
            onChange={handleChange}
            placeholder="Game Title (required)"
            required
          ></input>
          <select
            name="scenario"
            value={formValues.scenario}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Scenario (required)
            </option>
            <option value="Global">Global</option>
            <option value="War In Europe">War In Europe</option>
            <option value="Eastern Front">Eastern Front</option>
            <option value="Pacific">Pacific</option>
            <option value="North Africa">North Africa</option>
          </select>
          <button disabled={!formValues.name || !formValues.scenario}>
            Create Game
          </button>
        </form>
      </div>
      <GameList newGameAdded={newGameAdded} setNewGameAdded={setNewGameAdded} />
    </div>
  )
}

export default Home
