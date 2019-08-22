import React, { Component } from 'react';
import TrefleApiService from '../../services/trefle-api-service';
import placeholder from './placeholder.png';
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
        // console.log(searchTerm)

        TrefleApiService.getTreflePlants(searchTerm)
            .then(data => {
                console.log(data)
                const newData = data.map(item => {
                    if (item.images.length > 0){
                        return {
                            name: item.common_name,
                            family: item.family_common_name,
                            image: item.images[0].url
                        }
                    }else{
                        return {
                            name: item.common_name,
                            family: item.family_common_name,
                            image: 'no photo available'
                        }
                    }
                })
                // console.log(newData)
                this.setState({plants: newData})
            }).catch(err => {
                console.log(err)
                throw err
            })
    }

    submitNewSearch = e => {
        e.preventDefault()
        const { searchTerm } = e.target
        // console.log(searchTerm)
        const newSearchTerm = searchTerm.value

        TrefleApiService.getTreflePlants(newSearchTerm)
            .then(data => {
                // console.log(data)
                const newData = data.map(item => {
                    if (item.images.length > 0){
                        return {
                            name: item.common_name,
                            family: item.family_common_name,
                            image: item.images[0].url
                        }
                    }else{
                        return {
                            name: item.common_name,
                            family: item.family_common_name,
                            image: 'no photo available'
                        }
                    }
                })
                // console.log(newData)
                this.setState({plants: newData})
            }).catch(err => {
                console.log(err)
                throw err
            })

    }

    render() {
        // console.log(this.state)

        // const plantList = this.state.plants.filter(plant => plant.name!==null)

        const plantDetails = this.state.plants.map((plant, index) => {
            if(plant.image === 'no photo available'){
                return (
                    <section key={index}>
                        <p>Plant Name: {plant.name}</p>
                        <p>Plant Family: {plant.family} </p>
                        <p><img src={placeholder} alt={plant.image} /></p>
                    </section>
                )  
                
            } else {
                return (
                    <section key={index}>
                        <p>Plant Name: {plant.name}</p>
                        <p>Plant Family: {plant.family} </p>
                        <p><img src={plant.image} alt={plant.name} /></p>
                    </section>
                )
            }
        })


        return (
            <div className="container">
                <div className="search-bar-container">
                    <form className="search-form" onSubmit={this.submitNewSearch}>
                        <input
                            type="text" name="searchTerm" id="searchTerm" placeholder="Search again"
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                Number of Results: {this.state.plants.length}
                <div className="search-results">
                    {plantDetails}
                </div>
            </div>
        )
    }
}