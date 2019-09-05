import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import GreenhouseContext from '../../contexts/GreenhouseContext';
import './UserUniquePlant.css';


export default class UserUniquePlant extends Component {

    static contextType = GreenhouseContext

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    // key being sent from UserPlants
    // look in context for where the key matches the index
    // filter
    // setState with that specific plant

    // details will come from props

    // updating plant will need to update context so UserPlants page will be updated!

    constructor(props) {
        super(props)
        const userPlant = this.props.location.state
        this.state = {
            plant: { ...userPlant }
        }
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
                <button className='delete'>Delete</button>
                {/* confirm delete before deleting */}
                <button className='back' onClick={this.handleGoBack}>Back to Greenhouse</button>
            </div>
        )
    }
}