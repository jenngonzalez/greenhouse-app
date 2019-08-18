import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTreflePlants, getPlants } from '../api';
import STORE from '../plant-store';
import config from '../config';
import './SearchResults.css';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            plants: []
        }
    }

    // componentDidMount() {
    //     const apiUrl = config.API_URL
    //     const authToken = config.AUTH_TOKEN
    //     const searchTerm = this.props.location.state.searchTerm
    //     console.log(apiUrl, authToken, searchTerm)
    //     getTreflePlants(apiUrl, authToken, searchTerm)
    //         .then(data => {
    //             const newData = data.map(item => ({
    //                 name: item.common_name,
    //                 link: item.link
    //             }))
    //             this.setState = { newData }
    //         }).catch(err => {
    //             console.log(err)
    //             throw err
    //         })
    // }

    componentDidMount() {
        getPlants(STORE)
            .then(data => {
                return data.map(plant => ({
                    name: plant.common_name,
                    link: plant.link
                }))
            })
            .then(newData => {
                console.log(newData)
                this.setState({plants: newData})
            })
    }


    render() {
        console.log(this.state)
        const plantDetails = this.state.plants.map((plant, index) =>
            <li key={index}>
                {plant.name}
            </li>)
        return (
            <div className="container">
                <div className="search-bar-container">
                    <form className="search-form">
                        <input
                            type="text" name="search-bar" id="search-bar" placeholder="Search again"
                        />
                    </form>
                </div>
                <div className="search-results">
                    {/* <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section> */}
                    <ul>
                        {plantDetails}
                    </ul>
                </div>
            </div>
        )
    }
}