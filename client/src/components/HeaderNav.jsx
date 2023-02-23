import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const HeaderNav = () => {
  const location = useLocation()

  const currentPath = 'nav-option clickable currentPath'
  const notCurrentPath = 'nav-option clickable'

  return (
    <div id="header">
      <div id="header-title">WAR ROOM</div>
      <div id="nav-options">
        <Link to="/" className={location.pathname==='/'?currentPath:notCurrentPath}>Home</Link>
      </div>
    </div>
  )
}

export default HeaderNav