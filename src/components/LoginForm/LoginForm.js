import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './LoginForm.css';



export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {},
        onCancel: () => {}
    }
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null
        }
    }

    handleSubmitAuth = e => {
        e.preventDefault()
        this.setState({ loading: true })
        const { email, password } = e.target

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                email.value=''
                password.value=''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserName(res.user_name)
                this.setState({ loading: false })
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ loading: false, error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='login-form'
                onSubmit={this.handleSubmitAuth}
            >
                {this.state.loading && <p className='loading'>Logging You In ...</p>}
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <label htmlFor='email'>Email Address:</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                />
                <div className='login-buttons'>
                    <button type='submit'>Login</button>
                    <input type='button' name='cancel' value='Cancel' onClick={this.props.onCancel} />
                </div>
            </form>
        )
    }

}

