import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage';
import SignUpPage from './routes/SignupPage/SignUpPage';
import LoginPage from './routes/LoginPage/LoginPage';
import SearchResults from './routes/SearchResultsPage/SearchResults';
import UserPlants from './routes/UserPlants/UserPlants';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';

class App extends Component {

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='app-header'>
          <Header />
        </header>
        <main className='app-main'>
          {this.state.hasError && <p className='error'>There was an error! Oh no!</p>}
          <Switch>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <PublicOnlyRoute
              path='/signup'
              component={SignUpPage}
            />
            <PublicOnlyRoute
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
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
