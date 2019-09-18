import React, { Component } from 'react';
import AddPlantForm from '../../components/AddPlantForm/AddPlantForm';
import TokenService from '../../services/token-service';
import placeholder from './placeholder.png';
import './AddPlantPage.css';


export default class AddPlantPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.location.state.name,
            family: this.props.location.state.family || '',
            image: this.props.location.state.image || placeholder
        };
    }

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleAddPlantSuccess = () => {
        const { history } = this.props
        const username = TokenService.getUserName()
        history.push(`/user/${username}`)
    }

    handleCancel = () => {
        this.props.history.goBack()
    }


    render() {
        const plantDetails = {
            name: this.state.name,
            family: this.state.family,
            image: this.state.image
        }
        return (
            <div className="add-plant-page">
                <AddPlantForm onAddSuccess={this.handleAddPlantSuccess} onCancel={this.handleCancel} plantDetails={plantDetails}/>
            </div>
        )
    }
}