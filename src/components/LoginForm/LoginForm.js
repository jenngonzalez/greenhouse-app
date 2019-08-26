import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';



export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }
// can i use context here to update app state to logged in -- put it in onLoginSuccess function -- then the header can read the state and reset the state there, rerendering the header component


    state = { error: null }

    handleSubmitAuth = e => {
        e.preventDefault()
        this.setState({ error: null })
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
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='login-form'
                onSubmit={this.handleSubmitAuth}
            >
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
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
                <div className='password'>
                    <label htmlFor="password">Password:</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            required
                        />
                </div>
                <button type='submit'>Login</button>
            </form>
        )
    }

}

