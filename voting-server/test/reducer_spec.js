'use strict';

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import rewire from '../lib/auto-rewire';
import sinon from 'sinon';

import reducer from '../src/reducer';

const sAssert = sinon.assert;

describe('reducer', () => {

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('returns the passed state if the action type is unknown', () => {
    const action = { type: '___' };
    const nextState = reducer(Map(), action);
    expect(nextState).to.equal(Map());
  });

  it('handles SET_ENTRIES', () => {
    const setEntries = sinon.stub().returns('set_entries_result');
    rewire(reducer, { setEntries })
      .run(() => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        const ret = reducer(initialState, action);

        sAssert.calledWith(setEntries, initialState, action.entries);
        expect(ret).to.equal('set_entries_result');
      });
  });

  it('handles NEXT', () => {
    const next = sinon.stub().returns('next_result');
    rewire(reducer, { next })
      .run(() => {
        const initialState = fromJS({
          entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const ret = reducer(initialState, action);

        sAssert.calledWith(next, initialState);
        expect(ret).to.equal('next_result');
      });
  });

  it('handles VOTE', () => {
    const vote = sinon.stub().returns('vote_result');
    rewire(reducer, { vote })
      .run(() => {
        const initialState = fromJS({
          vote: {
            pair: ['Trainspotting', '28 Days Later']
          },
          entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const ret = reducer(initialState, action);

        sAssert.calledWith(vote, initialState.get('vote'), action.entry);
        expect(ret).to.equal(fromJS({
          vote: 'vote_result',
          entries: []
        }));
      });
  });

  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: [ 'A', 'B' ] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'A' },
      { type: 'VOTE', entry: 'B' },
      { type: 'VOTE', entry: 'A' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'A'
    }));
  });

});
