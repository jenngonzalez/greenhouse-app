import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    return (
      <div className='header-logged-in'>
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