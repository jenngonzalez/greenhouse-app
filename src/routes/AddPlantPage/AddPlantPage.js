import React, { Component } from 'react';
import AddPlantForm from '../../components/AddPlantForm/AddPlantForm';
import TokenService from '../../services/token-service';
// import { Redirect } from 'react-router';
// import AuthContext from '../../contexts/AuthContext';


export default class AddPlantPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.location.state.name,
            family: this.props.location.state.family || '',
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

    handleAddPlantSuccess = () => {
        const { history } = this.props
        const username = TokenService.getUserName()
        history.push(`/user/${username}`)
    }


    render() {
        const plantDetails = {
            name: this.state.name,
            family: this.state.family,
            image: this.state.image
        }
        // console.log(this.props.location.state.name)
        // console.log(this.props.location.state.family)
        // console.log(this.props.location.state.image)
        return (
            <div className="add-plant-page">
                <h2>Add a Plant</h2>
                <AddPlantForm onAddSuccess={this.handleAddPlantSuccess} plantDetails={plantDetails}/>
            </div>
        )
    }
}