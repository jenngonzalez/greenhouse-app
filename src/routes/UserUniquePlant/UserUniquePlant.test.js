import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserUniquePlant from './UserUniquePlant';

it('renders without crashing', () => {
  const div = document.createElement('div');

    const props = {
        match: {
            params: {
                username: 'username',
                plant: 'plant'
            }
        },
        history: {
            push: () => {},
        }
    }
  
  ReactDOM.render(
    <BrowserRouter>
        <UserUniquePlant {...props} />
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
