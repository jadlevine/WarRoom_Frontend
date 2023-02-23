import './App.css'
import { Routes, Route } from 'react-router-dom'
import HeaderNav from './components/HeaderNav'
import Home from './pages/Home'
import Game from './pages/Game'
// WelcomePage
// Footer

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:game_id" element={<Game />} />
      </Routes>
    </div>
  )
}

export default App
