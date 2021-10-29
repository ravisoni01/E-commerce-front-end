import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import App from './App';
import store from './store'

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

