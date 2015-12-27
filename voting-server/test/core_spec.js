import { List, Map, fromJS } from 'immutable';
import { expect }    from 'chai';
import { setEntries, next, vote } from '../src/core';

describe('Application logic', () => {

  describe('setEntries', () => {
    
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting', '28 Days Later']
      }));
    });

    it('converts anything iterable to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(fromJS({
        entries: ['Trainspotting', '28 Days Later']
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = fromJS({
        entries: ['Trainspotting', '28 Days Later', 'Sunshine']
      });
      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: ['Sunshine'],
        roundId: 1
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2
          }
        },
        entries: ['Sunshine', 'Millions', '127 Hours']
      });
      const nextState = next(state);

      expect(nextState).to.equal(
        fromJS({
          vote: {
            pair: ['Sunshine', 'Millions']
          },
          entries: ['127 Hours', 'Trainspotting'],
          roundId: 1
        })
      );
    });

    it('puts both from tied vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 3,
            '28 Days Later': 3
          }
        },
        entries: ['Sunshine', 'Millions', '127 Hours']
      });
      const nextState = next(state);

      expect(nextState).to.equal(
        fromJS({
          vote: {
            pair: ['Sunshine', 'Millions']
          },
          entries: ['127 Hours', 'Trainspotting', '28 Days Later'],
          roundId: 1
        })
      );
    });

    it('marks winner when just one entry left', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2
          }
        },
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(fromJS({
        winner: 'Trainspotting'
      }));
    });

    it('increments round id', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { 'Trainspotting': 1, '28 Days Later': 1 }
        },
        entries: List('Sunshine'),
        roundId: 1
      });

      const secondState = next(state);
      expect(secondState.get('roundId')).to.equal(2);

      const thirdState = next(secondState);
      expect(thirdState.get('roundId')).to.equal(3);
    });

  });

  describe('vote', () => {
    
    it('creates a tally for the voted entry', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later']
      });
      const nextState = vote(state, 'Trainspotting');
      
      expect(nextState).to.equal(
        fromJS({
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 1
          }
        })
      );
    });

    it('add to existing tally for the voted entry', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 3,
          '28 Days Later': 2
        }
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(
        fromJS({
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 4,
            '28 Days Later': 2
          }
        })
      );
    });

    it('ignores the vote if for an invalid entry', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later']
      });
      const nextState = vote(state, 'Sunshine');

      expect(nextState).to.equal(state);
    });

  });

});
