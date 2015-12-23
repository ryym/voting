import React from 'react';
import { render } from 'react-dom';
import Voting from './components/Voting';

// XXX: Hard coding for now.
const pair = [
  'Trainspotting',
  '28 Days Later'
];

render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
