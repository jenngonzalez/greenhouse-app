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
        this.state = {
            loading: false,
            error: null
        }
    }


    handleSubmit = e => {
        e.preventDefault()
        this.setState({ loading: true })
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
                this.setState({ loading: false })
                this.props.onSignUpSuccess()
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                })
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
                {this.state.loading && <p className='loading'>Submitting Your Info ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
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