import { List, Map } from 'immutable';

function setState(state, action) {
  const nextState = state.merge(action.state);
  if(isNewRound(state, nextState)) {
    return nextState.remove('hasVoted');
  }
  return nextState;
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  if (pair && pair.includes(entry)) {
    return state.set('hasVoted', entry);
  }
  return state;
}

function isNewRound(current, next) {
  const currentRound = current.get('roundId');
  const nextRound    = next.get('roundId');
  return currentRound !== nextRound;
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
