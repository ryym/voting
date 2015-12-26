import { List, Map } from 'immutable';

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

function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const pair = state.getIn(['vote', 'pair'], List());
  if (pair && ! pair.includes(hasVoted)) {
    return state.remove('hasVoted');
  }
  return state;
}

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return resetVote( setState(state, action) );
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
