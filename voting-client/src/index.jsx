import React from 'react';
import { render } from 'react-dom';
import Router, { Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import getClientId from './client_id';
import { setClientId, setState } from './action_creators';
import remoteActionMiddleWare from './remote_action_middleware';
import App from './components/App';
import { ResultsContainer } from './components/Results';
import { VotingContainer } from './components/Voting';

require('./style.scss');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

// Note: This just subscribes events emitted from the server.
// So the views might be rendered before we recieves a first state.
socket.on('state', state => {
  store.dispatch( setState(state) );
});

const clientId = getClientId(sessionStorage)();

const store = applyMiddleware(
  remoteActionMiddleWare(socket)
)(createStore)(reducer);

store.dispatch( setClientId(clientId) );

const routes = (
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>
);

render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
