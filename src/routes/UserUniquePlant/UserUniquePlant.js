import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import GreenhouseContext from '../../contexts/GreenhouseContext';
import './UserUniquePlant.css';
import DeletePlantApiService from '../../services/deleteplant-api-service';
import TokenService from '../../services/token-service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class UserUniquePlant extends Component {

    static contextType = GreenhouseContext

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        },
        loggedIn: false,
        editMode: false
    }

    constructor(props) {
        super(props)
        const userPlant = this.props.location.state
        this.state = {
            plant: { ...userPlant },
            updatedPlant: {},
            loggedIn: null,
            editMode: false,
        }
    }

    componentDidMount() {
        const paramUserName = this.props.match.params.username
        const loggedInUser = TokenService.getUserName()
        if(paramUserName === loggedInUser) {
            this.setState({loggedIn: true})
        } else(
            this.setState({loggedIn: false})
        )
    }

    handleClickEdit = () => {
        if(this.state.loggedIn === true) {
            this.setState({editMode: true})
        } else(
            alert(`Only the owner of this plant is able to make changes`)
        )
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

    renderNormalPage = () => {
        return (
            <div className='normal-mode'>
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
                <section className='normal-buttons'>
                    <button className='edit' onClick={this.handleClickEdit}>Edit</button>
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
                </section>
            </div>
        )
    }

    handleChangeName = (e) => {
        this.setState({
            updatedPlant: {
                ...this.state.updatedPlant,
                name: e.target.value
            }
        })
    }

    handleChangeFamily = (e) => {
        this.setState({
            updatedPlant: {
                ...this.state.updatedPlant,
                family: e.target.value
            }
        })
    }

    handleChangeWatered = (date) => {
        this.setState({
            updatedPlant: {
                ...this.state.updatedPlant,
                watered: date
            }
        });
    }

    handleChangeNotes = (e) => {
        this.setState({
            updatedPlant: {
                ...this.state.updatedPlant,
                notes: e.target.value
            }
        })
    }

    handleChangeImage = (e) => {
        this.setState({
            updatedPlant: {
                ...this.state.updatedPlant,
                image: e.target.value
            }
        })
    }

    renderEditMode = () => {
        return (
            <div className='edit-mode'>
                <form className='edit-plant-form'>
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
                        <button type='submit' onClick={this.handleEditPlant}>Save</button>
                        <button onClick={this.cancelEdit}>Cancel</button>
                    </section>
                </form>
            </div>
        )
    }

    handleEditPlant = () => {
        // prevent default
        // PATCH request here
    }

    handleEditSuccess = () => {
        // 
    }

    cancelEdit = () => {
        this.setState({editMode: false})
    }

    render() {
        return (
            <div className='unique-plant'>
            {this.state.editMode === true ? this.renderEditMode() : this.renderNormalPage()}
            </div>
        )
    }
}