import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reduxThunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducer/index';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
