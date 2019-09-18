import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import GreenhouseContext from '../../contexts/GreenhouseContext';
import './UserUniquePlant.css';
import DeletePlantApiService from '../../services/deleteplant-api-service';
import TokenService from '../../services/token-service';


export default class UserUniquePlant extends Component {

    static contextType = GreenhouseContext

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    // TODO:
        // updating plant will need to update context so UserPlants page will be updated!
            // don't show edit or delete buttons unless logged in username matches the username param
            // add 'userLoggedIn' to state (t/f)
            // on page load (componentDidMount?) - check if user being viewed is also logged in
            // if so, then set userLoggedIn to true,
            // dynamically render links
            // (if false, no edit/delete links are shown)
        // EDIT will transform page into form elements, submit PATCH request to server, then transform page back into normal page elements, saving updates


    constructor(props) {
        super(props)
        const userPlant = this.props.location.state
        this.state = {
            plant: { ...userPlant }
        }
    }


    handleDeletePlant = () => {
        const paramUserName = this.props.match.params.username
        const deletedPlant = this.props.match.params.plant
        const loggedInUser = TokenService.getUserName()
        if(paramUserName !== loggedInUser) {
            return alert ('Permission denied')
        } else {
            DeletePlantApiService.deletePlant(loggedInUser, deletedPlant)
            .then(this.context.deletePlant)
            .then(this.handleDeleteSuccess())
        }
    }

    handleDeleteSuccess = () => {
        const { history } = this.props
        const username = TokenService.getUserName()
        history.push(`/user/${username}`)
    }

    handleGoBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div className='unique-plant'>
                <section className='unique-plant-name'>
                    <p>{this.state.plant.name}</p>
                </section>
                <section className='unique-plant-image'>
                    <img src={this.state.plant.image} alt='' />
                </section>
                <section className='unique-plant-details'>
                    <p>Plant Family: {this.state.plant.family}</p>
                    <p>Last Watered: <Moment format="MM/DD/YY">{this.state.plant.watered}</Moment></p>
                    <p>Notes: {this.state.plant.notes}</p>
                </section>
                <button className='edit'>Edit</button>
                <button
                    className='delete'
                    onClick={e =>
                        window.confirm("Are you sure you wish to delete this plant?") && this.handleDeletePlant()
                    }
                >
                        Delete
                </button>
                <button
                    className='back'
                    onClick={this.handleGoBack}
                >
                    Back to Greenhouse
                </button>
            </div>
        )
    }
}