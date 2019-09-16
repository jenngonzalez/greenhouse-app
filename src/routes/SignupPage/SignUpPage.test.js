import React from 'react';
import ReactDOM from 'react-dom';
import SignUpPage from './SignUpPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    history: {
      push: () => {},
    },
  }
  ReactDOM.render(<SignUpPage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});