import React, { Component } from 'react';
import './LoginPage.css';


export default class LoginPage extends Component {
    render() {
        return (
            <div className="container">
                <h2>Log In</h2>
                <div class="form">
                    <form class="login-form" autocomplete='off'>
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="text"
                            name='username'
                            id='username'
                        />
                        <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                            />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}