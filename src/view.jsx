import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getStore from 'store/configureStore';
import App from 'components/App/App.render';

ReactDOM.render(
  <Provider store={getStore()}>
    <App />
  </Provider>,
  document.querySelector('#App')
);
