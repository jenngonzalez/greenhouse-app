import React, { Component } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './SignUpPage.css';

// TODO: sign up automatically logs the user in

export default class SignUpPage extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handleSignUpSuccess = () => {
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