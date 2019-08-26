import React, { Component } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './SignUpPage.css';

// TODO: May want to include a username, so that people can share their gardens with eachother (i.e. digitalgreenhouse.com/username or /user/username)

export default class SignUpPage extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handleSignUpSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <div className='signup-page'>
                <h2>Sign Up For An Account</h2>
                <SignUpForm onSignUpSuccess={this.handleSignUpSuccess}/>
            </div>
        )
    }
}

// should sign up automatically log the user in?