import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPlantForm.css';
import AddPlantApiService from '../../services/addplant-api-service';
import TokenService from '../../services/token-service';


export default class AddPlantForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.location.state.name,
            family: this.props.location.state.family || '',
            watered: new Date(),
            notes: '',
            image: this.props.location.state.image || ''
        };
    }

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    // static contextType = AuthContext

    handleAddSuccess = () => {
        const { history } = this.props
        const username = TokenService.getUserName()
        history.push(`/user/${username}`)
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
        const newPlant = {
            name: this.state.name,
            family: this.state.family,
            watered: this.state.watered,
            notes: this.state.notes,
            image: this.state.image
        }
        console.log(newPlant)
        AddPlantApiService.postPlant(newPlant)
            .then(this.context.addPlant)
            .then(this.handleAddSuccess())
            .catch(this.context.setError)
    }

    render() {
        console.log(this.state.image)
        return (
            <div className='add-plant-form'>
                <h2>Add a Plant</h2>
                <form className='plant-form'>
                    <label htmlFor='plant-name'>Plant Name:</label>
                    <input
                        type='text'
                        name='plant-name'
                        id='plant-name'
                        aria-label=''
                        aria-required='true'
                        value={this.state.name}
                        onChange={this.handleChangeName}
                        required
                    />
                    <label htmlFor='plant-family'>Plant Family:</label>
                    <input
                        type='text'
                        name='plant-family'
                        id='plant-family'
                        aria-label=''
                        aria-required='false'
                        value={this.state.family}
                        onChange={this.handleChangeFamily}
                    />
                    <label htmlFor='watered'>Last Watered:</label>
                    <DatePicker
                        selected={this.state.watered}
                        onChange={this.handleChangeWatered}
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
                        aria-label=''
                        aria-required='false'
                        onChange={this.handleChangeNotes}
                        rows={10}
                    />
                    <label htmlFor='plant-image'>Image:</label>
                    <input
                        type='url'
                        name='plant-image'
                        id='plant-image'
                        aria-label=''
                        aria-required='false'
                        value={this.state.image}
                        onChange={this.handleChangeImage}
                    />
                    <button type='submit' onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}