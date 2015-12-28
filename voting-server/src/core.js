import { List, Map, Set } from 'immutable';

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
      .remove('roundId')
      .set('winner', entries.first());
  }

  const roundId = state.get('roundId', 0);
  return state.merge({
    vote: Map({ pair: entries.take(2), }),
    entries: entries.skip(2),
    roundId: roundId + 1
  });
}
function getWinners(vote) {
  if(! vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['votes', a], Set()).size;
  const bVotes = vote.getIn(['votes', b], Set()).size;
  if (aVotes === bVotes) {
    return [a, b]
  }
  return (aVotes > bVotes) ? [a] : [b];
}

export function vote(state, entry, voter) {
  const pair = state.get('pair');
  if (pair && pair.includes(entry)) {
    return state.update(
      'votes', Map(),
      votes => {
        votes = removePrevVote(votes, voter);
        return votes.update(entry, Set(), voters => voters.add(voter));
      }
    );
  }
  return state;
}

function removePrevVote(votes, voter) {
  for (let [entry, voters] of votes.entries()) {
    if (voters.has(voter)) {
      return votes.update(
        entry,
        voters => voters.remove(voter)
      );
    }
  }
  return votes;
}
