import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const winners = getWinners(state.get('vote'));
  const entries = state.get('entries').concat(winners);
  if (entries.size === 1) {
    // Doesn't return just 'Map({winner: entries.first()})' because
    // we maight have some unrelated data in the state.
    return state
      .remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}
function getWinners(vote) {
  if(! vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes === bVotes) {
    return [a, b]
  }
  return (aVotes > bVotes) ? [a] : [b];
}

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry], 0,
    tally => tally + 1
  );
}
