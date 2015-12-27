import React from 'react'; // This is required to test React components.
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { Results } from '../../src/components/Results';
import { expect } from 'chai';
import { List, Map, Set } from 'immutable';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = ReactTestUtils;

describe('Results', () => {
  const pair = List.of('Trainspotting', '28 Days Later');

  const votes = Map({
    'Trainspotting': Set.of('v1', 'v2', 'v3'),
    '28 Days Later': Set.of('v4', 'v5')
  });

  function renderResults(props) {
    return renderIntoDocument(<Results {...props} />);
  }

  it('renders entries', () => {
    const results = renderResults({ pair, votes });
    const entries = scryRenderedDOMComponentsWithClass(results, 'entry-name');
    expect(
      entries.map(e => e.textContent)
    ).to.eql( pair.toArray() );
  });

  it('renders vote counts', () => {
    const results    = renderResults({ pair, votes });
    const renderedCounts = scryRenderedDOMComponentsWithClass(results, 'vote-count');
    const voteCounts = Array.from(votes.values()).map(v => v.size);
    expect(
      renderedCounts.map(v => parseInt(v.textContent, 10))
    ).to.eql(voteCounts);
  });

  it('renders zero as a vote count if not set', () => {
    const results = renderResults({
      pair,
      votes: votes.remove('28 Days Later')
    });
    const voteCounts = scryRenderedDOMComponentsWithClass(results, 'vote-count');
    expect(
      voteCounts.map(v => parseInt(v.textContent, 10))
    ).to.eql(
      [ votes.get('Trainspotting').size, 0 ]
    );
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const results = renderResults({ pair, votes, next });

    const nextButton = scryRenderedDOMComponentsWithClass(results, 'next')[0];
    Simulate.click(nextButton);
    expect(nextInvoked).to.be.true;
  });

  context('when there is a winner', () => {

    it('renders the winner', () => {
      const results = renderResults({
        pair, votes,
        winner: 'Trainspotting'
      });

      const winner = ReactDOM.findDOMNode(results.refs.winner);
      expect(winner).to.be.ok;
      expect(winner.textContent).to.contains('Trainspotting');
    });

  });

});
