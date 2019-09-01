import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
// import AuthContext from '../../contexts/AuthContext';

export default class Header extends Component {

//   static contextType = AuthContext

  static defaultProps = {
    loggedIn: false
  }

  state = {
      error: null,
      loggedIn: null
    }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearUserName()
    this.setState({
        loggedIn: false
    })

  }

  handleLoggedIn = () => {
      if(this.props.loggedIn===true) {
      this.setState({
        loggedIn: true
      })
    }
  }

  renderLogoutLink() {
    const username = TokenService.getUserName()
    return (
      <div className='header-logged-in'>
        <Link to={`/user/${username}`}>
            See Your Saved Plants
        </Link>
        <Link
            to={{
                pathname: '/addplant',
                state: {
                    name: '',
                    family: '',
                    image: ''
                }
        }}>
            Add A New Plant
        </Link>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='header-not-logged-in'>
        <Link
          to='/signup'>
          Sign Up
        </Link>
        {' '}
        <Link
          to='/login'>
          Log in
        </Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <h1>
          <Link to='/'>
            Digital Greenhouse
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    )
  }
}