import { Map } from 'immutable';

function setState(state, action) {
  return state.merge(action.state);
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  if (pair && pair.includes(entry)) {
    return state.set('hasVoted', entry);
  }
  return state;
}

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action);
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
