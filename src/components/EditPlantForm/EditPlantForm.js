import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EditPlantForm.css';
import EditPlantApiService from '../../services/editplant-api-service';
import GreenhouseContext from '../../contexts/GreenhouseContext';


export default class EditPlant extends Component {

    // cancel and submit both need to change the page back to editMode=false
    // function sent from props -> this.props.changeEditMode()

    static contextType = GreenhouseContext

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.plantDetails.name,
            family: this.props.plantDetails.family,
            watered: this.props.plantDetails.watered,
            notes: this.props.plantDetails.notes,
            image: this.props.plantDetails.image
        }
    }

    static defaultProps = {
        plantDetails: {},
        location: {},
        history: {
            push: () => {}
        },
        onEditSuccess: () => {},
        onCancel: () => {}
    }

    handleSubmitEdit = () => {
        // makes the patch request
    }

    render() {
        return (
            <div className='edit-mode'>
                <form className='edit-plant-form' onSubmit={this.handleSubmitEdit}>
                    <input
                        type='text'
                        name='plant-name'
                        id='plant-name'
                        aria-label=''
                        aria-required='false'
                        value={this.state.plant.name}
                        onChange={this.handleChangeName}
                    />
                    <img src={this.state.plant.image} alt='' />
                    <input
                        type='text'
                        name='plant-family'
                        id='plant-family'
                        aria-label=''
                        aria-required='false'
                        value={this.state.plant.family}
                        onChange={this.handleChangeFamily}
                    />
                    <DatePicker
                        selected={new Date(this.state.plant.watered)}
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
                    <textarea
                        type='text'
                        name='plant-notes'
                        id='plant-notes'
                        aria-label=''
                        aria-required='false'
                        value={this.state.plant.notes}
                        onChange={this.handleChangeNotes}
                        rows={10}
                    />
                    <input
                        type='url'
                        name='plant-image'
                        id='plant-image'
                        aria-label=''
                        aria-required='false'
                        value={this.state.plant.image}
                        onChange={this.handleChangeImage}
                    />
                    <section className='edit-form-buttons'>
                        <button type='submit'>Save</button>
                        <button onClick={this.cancelEdit}>Cancel</button>
                    </section>
                </form>
            </div>
        )
    }
}