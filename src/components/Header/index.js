import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <ul className="list-con">
        <li className="nav-content">
          <Link to="/">
            <img src="edupath.PNG" className="logo" />
          </Link>
          <Link to="/" className="nav-link">
            <p>Home</p>
          </Link>
          <Link to="/resources">
            <p>Resources</p>
          </Link>
          <Link to="/pyqs">
            <p>PYQs</p>
          </Link>
          <Link to="/attendance">
            <p>Attendance</p>
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
