import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

export default class SearchResults extends Component {
    render() {
        return (
            <div class="container">
                <div class="search-bar-container">
                    <form className="search-form">
                        <input
                            type="text" name="search-bar" id="search-bar" placeholder="Search again"
                        />
                    </form>
                </div>
                <div class="search-results">
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                    <section>
                    <p>Photo and Details</p>
                    <Link to='/user/plants'>Add To Your Garden</Link>
                    </section>
                </div>
            </div>
        )
    }
}