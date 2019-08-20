import React, { Component } from 'react';
import TrefleApiService from '../../services/trefle-api-service';
import './SearchResults.css';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            plants: []
        }
    }

    componentDidMount() {
        const searchTerm = this.props.location.state.searchTerm
        console.log(searchTerm)

        TrefleApiService.getTreflePlants(searchTerm)
            .then(data => {
                console.log(data)
                const newData = data.map(item => ({
                    name: item.common_name,
                    link: item.link
                }))
                console.log(newData)
                this.setState({plants: newData})
            }).catch(err => {
                console.log(err)
                throw err
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
                    <ul>
                        {plantDetails}
                    </ul>
                </div>
            </div>
        )
    }
}