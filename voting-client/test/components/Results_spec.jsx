import React from 'react'; // This is required to test React components.
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Results from '../../src/components/Results';
import { expect } from 'chai';
import { List, Map } from 'immutable';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = ReactTestUtils;

describe('Results', () => {
  const pair = List.of('Trainspotting', '28 Days Later');

  const tally = Map({
    'Trainspotting': 5,
    '28 Days Later': 4
  });

  function renderResults(props) {
    return renderIntoDocument(<Results {...props} />);
  }

  it('renders entries', () => {
    const results = renderResults({ pair, tally });
    const entries = scryRenderedDOMComponentsWithClass(results, 'entry-name');
    expect(
      entries.map(e => e.textContent)
    ).to.eql( pair.toArray() );
  });

  it('renders vote counts', () => {
    const results    = renderResults({ pair, tally });
    const voteCounts = scryRenderedDOMComponentsWithClass(results, 'vote-count');
    expect(
      voteCounts.map(v => parseInt(v.textContent, 10))
    ).to.eql( Array.from(tally.values()) );
  });

  it('renders zero as a vote count if not set', () => {
    const results = renderResults({
      pair, tally: tally.remove('28 Days Later')
    });
    const voteCounts = scryRenderedDOMComponentsWithClass(results, 'vote-count');
    expect(
      voteCounts.map(v => parseInt(v.textContent, 10))
    ).to.eql(
      [ tally.get('Trainspotting'), 0 ]
    );
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const results = renderResults({ pair, tally, next });

    Simulate.click( React.findDOMNode(results.refs.next) );
    expect(nextInvoked).to.be.true;
  });

  context('when there is a winner', () => {

    it('renders the winner', () => {
      const results = renderResults({
        pair, tally,
        winner: 'Trainspotting'
      });

      const winner = ReactDOM.findDOMNode(results.refs.winner);
      expect(winner).to.be.ok;
      expect(winner.textContent).to.contains('Trainspotting');
    });

  });

});
