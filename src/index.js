import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GreenhouseProvider } from './contexts/GreenhouseContext';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <GreenhouseProvider>
            <App />
        </GreenhouseProvider>
    </BrowserRouter>, document.getElementById('root'));