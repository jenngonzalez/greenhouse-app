import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
      }
    

    handleChange = event => {
            this.setState({ searchTerm: event.target.value });
    };

    render() {
        return (
            <div className="container">
                <div className="search-bar">
                    <form className="search-form">
                        <label htmlFor="search-bar">
                            Search for a plant:
                        </label>
                        <br />
                        <input
                            type="text" name="search-bar" id="search-bar" placeholder="Search Term" value={this.state.searchTerm} onChange={this.handleChange}
                        />
                        <Link to={{pathname: '/results', state: { searchTerm: this.state.searchTerm } }}><button>Go</button></Link>
                    </form>
                </div>
                <div className="app-description-one">
                    <h2>Find Your Plants</h2>
                    <h3>Search from a database of over 300,000 plants, seeing details such as water, nutrient, and sunlight requirements.</h3>
                </div>
                <hr />
                <div className="app-description-two">
                    <h2>Keep Track of Your Garden</h2>
                    <h3>See a list of your saved plants, with the option to upload your own photos. Save details for each plant, such as the last time it was watered or fed, and add your own personal comments.</h3>
                </div>
                <hr />
                <div className="app-description-three">
                    <h2>Never Kill Another Plant</h2>
                    <h3>Receive push notifications with reminders to water or feed your plants.</h3>
                </div>
                <hr />
                {/* <div className="links">
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </div> */}
            </div>
        )
    }
}