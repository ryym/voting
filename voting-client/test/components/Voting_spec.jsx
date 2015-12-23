import React from 'react'; // This is required to test React components.
import ReactTestUtils from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import { expect } from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} = ReactTestUtils;

describe('Voting', () => {
  const pair = ['Trainspotting', '28 Days Later'];

  function renderVoting(props) {
    return renderIntoDocument(<Voting {...props} />);
  }

  it('renders a pair of buttons', () => {
    const voting  = renderVoting({ pair });
    const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');

    expect( buttons.map(b => b.textContent) ).to.eql(pair);
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote    = entry => votedWith = entry;
    const voting  = renderVoting({ pair, vote })
    const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');

    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Trainspotting');
  });

  context('when user has voted', () => {

    it('disables buttons', () => {
      const voting = renderVoting({
        pair,
        hasVoted: 'Trainspotting'
      });
      const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');

      expect(
        buttons.map(b => b.hasAttribute('disabled'))
      ).to.eql([true, true]);
    });

    it('adds label to the voted entry', () => {
      const voting = renderVoting({
        pair,
        hasVoted: 'Trainspotting'
      });
      const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');

      expect(buttons[0].textContent).to.contains('Voted');
    });

  });

});
