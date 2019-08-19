import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import SignUpPage from './routes/SignupPage/SignUpPage';
import LoginPage from './routes/LoginPage/LoginPage';
import SearchResults from './routes/SearchResultsPage/SearchResults';
import UserPlants from './routes/UserPlants/UserPlants';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
          <h1><Link to="/">Digital Greenhouse</Link></h1>
        </header>
        <div className='app-body'>
          <main className='main'>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <Route
              path='/signup'
              component={SignUpPage}
            />
            <Route
              path='/login'
              component={LoginPage}
            />
            <Route
              path='/results'
              component={SearchResults}
            />
            <Route
              path='/user/plants'
              component={UserPlants}
            />
          </main>
        </div>
      </div>
    )
  }
}
