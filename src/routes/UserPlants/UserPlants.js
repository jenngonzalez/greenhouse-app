import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GetPlantsApiService from '../../services/getplants-api-service';
import GreenhouseContext from '../../contexts/GreenhouseContext';
import './UserPlants.css';
import placeholder from './placeholder.png';


export default class UserPlants extends Component {

    static contextType = GreenhouseContext

    constructor(props) {
        super(props)
        this.state = {
            plants: []
        }
    }

    componentDidMount() {
        const { username } = this.props.match.params
        GetPlantsApiService.getPlants(username)
            .then(plantData => {
                const userPlants = plantData.map(plant => {
                    return {
                        id: plant.id,
                        name: plant.name,
                        family: plant.family,
                        watered: plant.watered,
                        notes: plant.notes,
                        image: plant.image || placeholder
                    }
                })
                this.context.addPlants(userPlants)
            }).catch(err => {
                console.log(err)
                throw err
            })
    }

    renderPlants = () => {
        const { username } = this.props.match.params
        return this.context.plants.map(plant =>
            <section className='userPlant' key={plant.id}>
                <Link to={{
                    pathname: `/user/${username}/${plant.id}`,
                    state: {
                        id: plant.id,
                        name: plant.name,
                        family: plant.family,
                        watered: plant.watered,
                        notes: plant.notes,
                        image: plant.image
                    }
                }}>
                <section className='within-link'>
                    <span className='span-name'><p className='name'>{plant.name}</p></span>
                    <img className='image' src={plant.image} alt='' />
                </section>
                </Link>
            </section>
        )
    }

    render() {
        const { username } = this.props.match.params
        return (
            <div className="plant-container">
                <h2>{username}'s garden</h2>
                <div className="plant-list">
                    {this.renderPlants()}
                </div>
            </div>
        )
    }
}