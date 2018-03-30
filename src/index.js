import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

ReactDOM.render((
  <Provider store={store} >
    <Router>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
