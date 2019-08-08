import React, { Component } from 'react';
import './SignUpPage.css';

// TODO: May want to include a username, so that people can share their gardens with eachother (i.e. digitalgreenhouse.com/username or /user/username)

export default class SignUpPage extends Component {
    render() {
        return (
            <div className="container">
                <h2>Sign Up</h2>
                <div class="form">
                    <form class="signup-form" autocomplete='off'>
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