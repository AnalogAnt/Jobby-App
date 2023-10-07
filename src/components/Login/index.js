import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSucc = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFail = errMsg => {
    this.setState({showSubmitErr: true, errorMsg: errMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === 'hacksters' && password === 'hacksters123') {
      this.onSubmitSucc('1234')
    } else {
      this.onSubmitFail('Invalid')
    }
  }

  render() {
    const {username, password, showSubmitErr, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-con">
        <form className="loginCard" onSubmit={this.onFormSubmit}>
          <img src="edupath.PNG" alt="website logo" className="logo" />
          <label className="lable">
            USERNAME
            <input
              onChange={this.onChangeUsername}
              value={username}
              type="text"
              placeholder="Username"
            />
          </label>
          <label className="lable">
            PASSWORD
            <input
              onChange={this.onChangePassword}
              value={password}
              type="password"
              placeholder="Password"
            />
          </label>
          <button type="submit" className="logBut">
            Login
          </button>
          {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
