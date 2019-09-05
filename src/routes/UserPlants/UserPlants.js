import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
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
// TODO: ideal path would be just /:username (rather than /user/:username, difficulty in having a single variable dynamic path since anything will match it)

// not a protected path, as people may want to share their plant page with others
// editing is protected, will redirect to patchplantform if logged in as that user
// delete is protected and will redirect to userplants page (now minus the deleted plant)
// patchplantform will be identical to addplant form, send a PATCH req instead of a POST


    componentDidMount() {
        const { username } = this.props.match.params
        GetPlantsApiService.getPlants(username)
            .then(plantData => {
                const userPlants = plantData.map(plant => {
                    return {
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
        return this.context.plants.map((plant,index) =>
            <section className='userPlant' key={index}>
                <Link to={{
                    pathname: `/user/${username}/${index}`,
                    state: {
                        key: index,
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
                <h2>{username}'s Garden</h2>
                <div className="plant-list">
                    {this.renderPlants()}
                </div>
            </div>
        )
    }
}