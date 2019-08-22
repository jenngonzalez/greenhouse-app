import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Redirect } from 'react-router';
import './LoginPage.css';
import AuthContext from '../../contexts/AuthContext';


export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    static contextType = AuthContext

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        // // history.push(destination)
        this.context.loggedIn()
        console.log('logged in')
        history.push('/user/plants')
    }

    render() {
        return (
            <div className="LoginPage">
                <h2>Log In</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
            </div>
        )
    }
}