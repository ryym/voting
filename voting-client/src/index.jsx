import React from 'react';
import { render } from 'react-dom';
import Router, { Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import Results from './components/Results';
import { VotingContainer } from './components/Voting';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['Sunshine', '28 Days Later'],
      tally: { 'Sunshine': 2 }
    }
  }
});

const routes = (
  <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={VotingContainer} />
  </Route>
);

render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
