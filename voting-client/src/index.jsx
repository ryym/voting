import React from 'react';
import { render } from 'react-dom';
import Router, { Route } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import { setState } from './action_creators';
import remoteActionMiddleWare from './remote_action_middleware';
import App from './components/App';
import { ResultsContainer } from './components/Results';
import { VotingContainer } from './components/Voting';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => {
  store.dispatch( setState(state) );
});

const store = applyMiddleware(
  remoteActionMiddleWare(socket)
)(createStore)(reducer);

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
