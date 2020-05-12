import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  const main = document.createElement('main');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  ReactDOM.unmountComponentAtNode(main);
});
