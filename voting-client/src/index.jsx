import React from 'react';
import { render } from 'react-dom';
import Router, { Route } from 'react-router';
import App from './components/App';
import Results from './components/Results';
import Voting from './components/Voting';

const routes = (
  <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
  </Route>
);

render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);
