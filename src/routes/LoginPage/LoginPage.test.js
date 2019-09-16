import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    location: {},
    history: {
      push: () => {},
    },
  }
  ReactDOM.render(<LoginPage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});