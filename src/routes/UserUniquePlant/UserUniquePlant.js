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

    // updating plant will need to update context so UserPlants page will be updated!
    // same for delete plant

    constructor(props) {
        super(props)
        const userPlant = this.props.location.state
        this.state = {
            plant: { ...userPlant }
        }
    }

    // don't show edit or delete buttons unless logged in username matches the username param
    // add 'userLoggedIn' to state (t/f)
    // on page load (componentDidMount?) - check if user being viewed is also logged in
    // if so, then set userLoggedIn to true,
    // dynamically render links
    // (if false, no edit/delete links are shown)

    // have user confirm before deleting (alert?)
    // create alert? with yes/no buttons
    // if yes, continue
    // if no, cancel alert and return to plant page

    handleDeletePlant = () => {
        const paramUserName = this.props.match.params.username
        const deletedPlant = this.props.match.params.plant
        const loggedInUser = TokenService.getUserName()
        if(paramUserName !== loggedInUser) {
            return alert ('Permission denied')
        } else {
            DeletePlantApiService.deletePlant(loggedInUser, deletedPlant)
            .then(this.context.deletePlant(deletedPlant))
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
                <button className='delete' onClick={this.handleDeletePlant}>Delete</button>
                {/* confirm delete before deleting */}
                <button className='back' onClick={this.handleGoBack}>Back to Greenhouse</button>
            </div>
        )
    }
}