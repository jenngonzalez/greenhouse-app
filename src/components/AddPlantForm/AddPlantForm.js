import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddPlantForm.css';
import config from '../../config'


export default class AddPlantForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.location.state.name,
            family: this.props.location.state.family || '',
            startDate: new Date(),
            notes: '',
            image: this.props.location.state.image || ''
        };
        // this.handleChange = this.handleChange.bind(this);
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
            startDate: date
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

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     fetch(config.API_NOTES, {
    //         method: 'POST',
    //         body: JSON.stringify(newNote),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             if(!response.ok) {
    //                 return response.json().then(error => {
    //                     throw error
    //                 })
    //             }
    //             return response.json()
    //         })
    //         .then(data => {
    //             noteTitle.value=''
    //             noteContent.value=''
    //             this.context.addNote(data)
    //             this.props.history.push('/')
    //         })
    //         .catch(error => {
    //             this.setState({ error })
    //         })
    // }

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
                        selected={this.state.startDate}
                        onChange={this.handleChangeWatered}
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