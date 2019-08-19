import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';


export default class SignUpForm extends Component {
    static defaultProps = {
        onSignUpSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ error: null })
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
            .catch(res => {
                this.setState({ error: res.error })
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
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='email'>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        required
                    />
                </div>
                <div className='username'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        required
                    />
                </div>
                <div className='password'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        required
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        )
    }
}