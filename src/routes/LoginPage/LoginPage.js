import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import TokenService from '../../services/token-service';
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
        const { history } = this.props
        const username = TokenService.getUserName()
        this.context.loggedIn()
        history.push(`/user/${username}`)
    }

    handleCancel = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="LoginPage">
                <h2>Log In</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess} onCancel={this.handleCancel} />
            </div>
        )
    }
}