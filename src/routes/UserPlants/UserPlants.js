import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserPlants.css';

export default class UserPlants extends Component {

// componentDidMount should perform a GET request for all plants that match a the user (user id or username)
// ideally, path would be /:username
// not a protected path, as people may want to share their plant page with others
// editing is protected, will reroute to patchplantform if logged in as that user
// patchplantform will be identical to addplant form, send a PATCH req instead of a POST


    render() {
        return (
            <div className="container">
                <h2>Username's Garden</h2>
                <div className="plant-list">
                    <div className="plant">
                        <p>plant1</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant2</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant3</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant4</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant5</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant6</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant7</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant8</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                    <div className="plant">
                        <p>plant9</p>
                        <Link to='/:plant_id'>See Details</Link>
                    </div>
                </div>
            </div>
        )
    }
}