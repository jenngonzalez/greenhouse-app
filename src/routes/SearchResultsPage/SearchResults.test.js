import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchResults from './SearchResults';

it('renders without crashing', () => {
  const div = document.createElement('div');

    const props = {
        location: {
            state: {
                searchTerm: 'search term'
            }
        },
        history: {
            push: () => {},
        }
    }
  
  ReactDOM.render(
    <BrowserRouter>
        <SearchResults {...props} />
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
