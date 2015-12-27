import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  
  describe('SET_STATE', () => {

    it('sets a new state', () => {
      const initialState = Map();
      const action = {
        type: 'SET_STATE',
        state: Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({ 'Trainspotting': 1 })
          })
        })
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { 'Trainspotting': 1 }
        }
      }));
    });

    it('sets a new state with plain JS payload', () => {
      const initialState = Map();
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: { 'Trainspotting': 1 }
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ],
          tally: { 'Trainspotting': 1 }
        }
      }));
    });

    it('sets a new state without initial state', () => {
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: { 'Trainspotting': 1 }
          }
        }
      };
      const nextState = reducer(undefined, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { 'Trainspotting': 1 }
        }
      }));
    });

    context('when round changes', () => {

      it('removes hasVoted', () => {
        const initialState = fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: { 'Trainspotting': 1 }
          },
          hasVoted: 'Trainspotting',
          roundId: 1
        });
        const action = {
          type: 'SET_STATE',
          state: {
            vote: { pair: ['Sunshine', 'Slumdog Millionaire'] },
            roundId: 2
          }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Sunshine', 'Slumdog Millionaire']
          },
          roundId: 2
        }));
      });

      it('removes hasVoted even if same entry is in next pair', () => {
        const initialState = fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: { 'Trainspotting': 1 }
          },
          hasVoted: 'Trainspotting',
          roundId: 1
        });
        const action = {
          type: 'SET_STATE',
          state: {
            vote: { pair: ['Trainspotting', 'Sunshine'] },
            roundId: 2
          }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Trainspotting', 'Sunshine']
          },
          roundId: 2
        }));
      });

    });

  });

  describe('SET_CLIENT_ID', () => {

    it('sets a client id', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later']
      });
      const clientId = '12345-client-id';
      const action = { type: 'SET_CLIENT_ID', clientId };

      const nextState = reducer(state, action);
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        clientId
      }));
    });

  });

  describe('VOTE', () => {

    it('sets a voted entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { Trainspotting: 1 }
        }
      });
      const action = { type: 'VOTE', entry: 'Trainspotting' };
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { Trainspotting: 1 }
        },
        hasVoted: 'Trainspotting'
      }));
    });

    it('does not set hasVoetd on invalid entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { Trainspotting: 1 }
        }
      });
      const action = { type: 'VOTE', entry: 'Unknown title' };
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: { Trainspotting: 1 }
        }
      }));
    });

  });

});
