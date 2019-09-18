import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TrefleApiService from '../../services/trefle-api-service';
import placeholder from './placeholder.png';
import './SearchResults.css';

export default class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            plants: [],
            loading: false,
            error: false
        }
    }


    componentDidMount() {
        const searchTerm = this.props.location.state.searchTerm
        this.setState({loading: true})
        TrefleApiService.getTreflePlants(searchTerm)
            .then(data => {
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
                            image: placeholder
                        }
                    }
                })
                this.setState({plants: newData, loading: false})
    
            }).catch(err => {
                console.log(err)
                this.setState({error: true, loading: false})
                throw err
            })
    }

    submitNewSearch = e => {
        e.preventDefault()
        const { searchTerm } = e.target
        const newSearchTerm = searchTerm.value
        this.setState({loading: true})

        TrefleApiService.getTreflePlants(newSearchTerm, placeholder)
            .then(data => {
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
                            image: placeholder
                        }
                    }
                })
                this.setState({plants: newData, loading: false})
            }).catch(err => {
                console.log(err)
                throw err
            })

    }

    render() {
        const plantDetails = this.state.plants.map((plant, index) => {
            return (
                <section key={index}>
                    <p>{plant.name},</p>
                    <p>{plant.family}</p>
                    <p><img src={plant.image} alt={plant.name} className='search-image' /></p>
                    <Link
                        to={{pathname: '/addplant',
                            state: {
                                name: plant.name,
                                family: plant.family,
                                image: plant.image
                            }
                        }}
                    >
                        Add To Your Greenhouse
                    </Link>
                </section>
            )
        })


        return (
            <div className="results-container">
                <div className="search-bar-container">
                    <form className="results-search-form" onSubmit={this.submitNewSearch}>
                        <input
                            type="text" name="searchTerm" id="searchTerm" placeholder="Search again"
                        />
                        <button type='submit'>Go</button>
                    </form>
                </div>
                <div className='number-of-results'>
                    Number of Results: <span>{this.state.loading ? <p className='loading'>Loading ...</p> : this.state.plants.length}</span>
                </div>
                <div className="search-results">
                    {plantDetails}
                </div>
            </div>
        )
    }
}