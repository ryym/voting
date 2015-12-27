import { List, Map } from 'immutable';

function setState(state, action) {
  const nextState = state.merge(action.state);
  if (isSameRound(state, nextState)) {
    const entry = findVotedEntry(nextState);
    if (entry) {
      return nextState.set('hasVoted', entry);
    }
  }
  return nextState;
}

function setClientId(state, clientId) {
  return state.set('clientId', clientId);
}

function isSameRound(current, next) {
  const currentRound = current.get('roundId');
  const nextRound    = next.get('roundId');
  return currentRound === undefined || currentRound === nextRound;
}

function findVotedEntry(state) {
  const clientId = state.get('clientId');
  if (! clientId) {
    return;
  }
  const votes = state.getIn(['vote', 'votes'], Map());
  for (let [entry, voters] of votes.entries()) {
    if (voters.includes(clientId)) {
      return entry;
    }
  }
}

export default function reducer(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return setState(state, action);
    case 'SET_CLIENT_ID':
      return setClientId(state, action.clientId);
  }
  return state;
}
