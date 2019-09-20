import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import './SignUpForm.css';


export default class SignUpForm extends Component {
    static defaultProps = {
        onSignUpSuccess: () => {},
        onCancel: () => {}
    }

    constructor(props) {
        super(props)
        this.state = { error: '' }
    }


    handleSubmit = e => {
        e.preventDefault()
        const { email, username, password } = e.target

        AuthApiService.postUser({
            email: email.value,
            user_name: username.value,
            password: password.value,
        })
            .then(user => {
                email.value = ''
                username.value = ''
                password.value = ''
                this.props.onSignUpSuccess()
            })
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='signup-form'
                autoComplete='off'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {!!error.length && <p className='red'>{error}</p>}
                </div>
                <label htmlFor='email'>Email Address:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    aria-label='your email address'
                    aria-required='true'
                    autoComplete='email'
                    required
                />
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    aria-label='create a username'
                    aria-required='true'
                    autoComplete='username'
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    aria-label='create a password'
                    aria-required='true'
                    autoComplete='password'
                    required
                />
                <div className='signup-buttons'>
                    <button type='submit'>Sign Up</button>
                    <button type='button' onClick={this.props.onCancel}>Cancel</button>
                </div>
            </form>
        )
    }
}