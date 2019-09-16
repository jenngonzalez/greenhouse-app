import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserPlants from './UserPlants';

it('renders without crashing', () => {
  const div = document.createElement('div');

    const props = {
        match: {
            params: {
                username: 'username'
            }
        },
        history: {
            push: () => {},
        }
    }
  
  ReactDOM.render(
    <BrowserRouter>
        <UserPlants {...props} />
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
