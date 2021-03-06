import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import Header from './components/Header/Header';
import LandingPage from './routes/LandingPage/LandingPage';
import SignUpPage from './routes/SignupPage/SignUpPage';
import LoginPage from './routes/LoginPage/LoginPage';
import SearchResults from './routes/SearchResultsPage/SearchResults';
import UserPlants from './routes/UserPlants/UserPlants';
import UserUniquePlant from './routes/UserUniquePlant/UserUniquePlant';
import AddPlantPage from './routes/AddPlantPage/AddPlantPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import AuthContext from './contexts/AuthContext';

class App extends Component {

  state = {
    hasError: false,
    loggedIn: false
  }


  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  loggedIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  loggedOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  render() {

    const contextValue = {
      loggedIn: this.loggedIn
    }

    return (
      <div className='App'>
        <AuthContext.Provider value={contextValue}>
          <header className='app-header'>
            <Header loggedIn={this.state.loggedIn} />
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
                exact path='/user/:username'
                component={UserPlants}
              />
              {/* is there any way for the path to be just '/:username' without disrupting the other endpoints? */}
              <Route
                exact path='/user/:username/:plant'
                component={UserUniquePlant}
              />
              <Route
                path='/addplant'
                component={AddPlantPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
          <footer>
            <p className='copyright'>&copy; Jennifer Gonzalez 2019</p>
            <p>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></p>
          </footer>
        </AuthContext.Provider>
      </div>
    )
  }
}

export default App
