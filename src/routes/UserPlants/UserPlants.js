import React, { Component } from 'react';
import GetPlantsApiService from '../../services/getplants-api-service';
import './UserPlants.css';

export default class UserPlants extends Component {

    constructor(props) {
        super(props)
        this.state = {
            plants: []
        }
    }

// componentDidMount should perform a GET request for all plants that match a the user (user id or username)
// ideally, path would be /:username
// not a protected path, as people may want to share their plant page with others
// editing is protected, will redirect to patchplantform if logged in as that user
// delete is protected and will redirect to userplants page (now minus the deleted plant)
// patchplantform will be identical to addplant form, send a PATCH req instead of a POST


// i think we need a componentWillUpdate() here to rerender the page after a new plant is added

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
                        image: plant.image || ''
                    }
                })
                this.setState({plants: userPlants})
            }).catch(err => {
                console.log(err)
                throw err
            })
    }

    renderPlants = () => {
        return this.state.plants.map((plant,index) =>
            <section className='userPlant' key={index}>
                <p className='name'>Plant name: {plant.name}</p>
                <p className='family'>Plant family: {plant.family}</p>
                <p className='watered'>Last watered: {plant.watered}</p>
                <p className='notes'>Notes: {plant.notes}</p>
                <img className='image' src={plant.image} alt='' />
            </section>
        )
    }

    render() {

        // map over plants in state, returning sections with: plant details, edit link, delete link
        return (
            <div className="container">
                <h2>Username's Garden</h2>
                <div className="plant-list">
                    {this.renderPlants()}
                </div>
            </div>
        )
    }
}