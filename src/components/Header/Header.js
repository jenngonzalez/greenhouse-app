import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';
import icon from './growth.png';



export default class Header extends Component {


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
            Your Greenhouse
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
            Add A Plant
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
      <div className='header-logged-out'>
        <Link
          to='/signup'>
          Sign Up
        </Link>
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
        <div className='header-and-icon'>
          <h1>
            <Link to='/'>
              Digital Greenhouse
            </Link>
          </h1>
          <img src={icon} alt=''/>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    )
  }
}