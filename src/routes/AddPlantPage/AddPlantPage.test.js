import React from 'react';
import ReactDOM from 'react-dom';
import AddPlantPage from './AddPlantPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    location: {
        state: {
            name: 'name',
            family: 'family',
            image: 'image'
        }
    },
    history: {
      push: () => {},
    }
  }
  ReactDOM.render(<AddPlantPage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});