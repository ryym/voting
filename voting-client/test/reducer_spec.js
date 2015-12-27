import { List, Map, Set, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
  const clientId = 'test-client';
  
  describe('SET_STATE', () => {

    it('sets a new state', () => {
      const initialState = Map();
      const action = {
        type: 'SET_STATE',
        state: Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            votes: Map({ 'Trainspotting': Set.of(clientId) })
          })
        })
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
            votes: Map({ 'Trainspotting': Set.of(clientId) })
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
            votes: { 'Trainspotting': Set.of(clientId) }
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ],
          votes: { 'Trainspotting': Set.of(clientId) }
        }
      }));
    });

    it('sets a new state without initial state', () => {
      const action = {
        type: 'SET_STATE',
        state: {
          vote: {
            pair: ['Trainspotting', '28 Days Later'],
            votes: { 'Trainspotting': Set.of(clientId) }
          }
        }
      };
      const nextState = reducer(undefined, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          votes: { 'Trainspotting': Set.of(clientId) }
        }
      }));
    });

    context('when the client has voted already', () => {

      it('sets "hasVoted" state automatically', () => {
        const action = {
          type: 'SET_STATE',
          state: {
            vote: {
              pair: ['Trainspotting', 'Sunshine'],
              votes: { 'Trainspotting': Set.of(clientId) }
            },
            clientId
          }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
          vote: {
            pair: ['Trainspotting', 'Sunshine'],
            votes: { 'Trainspotting': Set.of(clientId) }
          },
          hasVoted: 'Trainspotting',
          clientId
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

});
