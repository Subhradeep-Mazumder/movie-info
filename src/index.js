import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import reducer from './GlobalStore/Reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer,applyMiddleware(thunk));
ReactDOM.render(
  <Provider store = {store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
