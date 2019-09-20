import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPlantForm.css';
import AddPlantApiService from '../../services/addplant-api-service';
import GreenhouseContext from '../../contexts/GreenhouseContext';
import placeholder from './placeholder.png';
import TokenService from '../../services/token-service';


export default class AddPlantForm extends Component {

    static contextType = GreenhouseContext

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.plantDetails.name,
            family: this.props.plantDetails.family,
            watered: new Date(),
            notes: '',
            image: this.props.plantDetails.image
        }
    }

    static defaultProps = {
        plantDetails: {},
        location: {},
        history: {
            push: () => {}
        },
        onAddSuccess: () => {},
        onCancel: () => {}
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeFamily = (e) => {
        this.setState({
            family: e.target.value
        })
    }

    handleChangeWatered = (date) => {
        this.setState({
            watered: date
        });
    }

    handleChangeNotes = (e) => {
        this.setState({
            notes: e.target.value
        })
    }

    handleChangeImage = (e) => {
        this.setState({
            image: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const hasToken = TokenService.hasAuthToken()
        if(!hasToken) {
            alert('You must be logged in to add a plant')
        } else {
            if(this.state.name === '') {
                alert('Plant name is required')
                return false
            }
            const newPlant = {
            name: this.state.name,
            family: this.state.family,
            watered: this.state.watered,
            notes: this.state.notes,
            image: this.state.image === '' ? placeholder : this.state.image
            }
            AddPlantApiService.postPlant(newPlant)
                .then(this.context.addPlant)
                .then(this.props.onAddSuccess)
                .catch(this.context.setError)
        }
    }

    render() {
        return (
            <div className='add-plant-form'>
                <h2>Add a Plant</h2>
                <form className='plant-form' onSubmit={this.handleSubmit}>
                    <label htmlFor='plant-name'>Plant Name:</label>
                    <input
                        required
                        title='This field is required'
                        type='text'
                        name='plant-name'
                        id='plant-name'
                        aria-label='name of your plant'
                        aria-required='true'
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                    <label htmlFor='plant-family'>Plant Family:</label>
                    <input
                        type='text'
                        name='plant-family'
                        id='plant-family'
                        aria-label='family of your plant'
                        aria-required='false'
                        value={this.state.family}
                        onChange={this.handleChangeFamily}
                    />
                    <label htmlFor='watered'>Last Watered:</label>
                    <DatePicker
                        selected={this.state.watered}
                        onChange={this.handleChangeWatered}
                        aria-label='date your plant was last watered'
                        aria-required='false'
                        popperPlacement='bottom'
                        popperModifiers={{
                            flip: {
                                behavior: ['bottom'] // don't allow it to flip to be above
                            },
                            preventOverflow: {
                                enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                            },
                            hide: {
                                enabled: false // turn off since needs preventOverflow to be enabled
                            }
                        }}
                    />
                    <label htmlFor='plant-notes'>Notes:</label>
                    <textarea
                        type='text'
                        name='plant-notes'
                        id='plant-notes'
                        aria-label='personal notes for your plant'
                        aria-required='false'
                        onChange={this.handleChangeNotes}
                        rows={10}
                    />
                    <label htmlFor='plant-image'>Image:</label>
                    <input
                        type='text'
                        name='plant-image'
                        id='plant-image'
                        aria-label='A URL to a hosted image is required'
                        aria-required='false'
                        value={this.state.image}
                        onChange={this.handleChangeImage}
                    />
                    <span className='hosted'><p>*requires a hosted image</p></span>
                    <section className='add-form-buttons'>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={this.props.onCancel}>Go Back</button>
                    </section>
                </form>
            </div>
        )
    }
}