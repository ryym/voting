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

  it('renders a pair of buttons', () => {
    const pair = ['Trainspotting', '28 Days Later'];
    const voting = renderIntoDocument(
      <Voting pair={pair} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');

    expect( buttons.map(b => b.textContent) ).to.eql(pair);
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = entry => votedWith = entry;
    const pair = ['Trainspotting', '28 Days Later'];

    const voting = renderIntoDocument(
      <Voting pair={pair} vote={vote} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(voting, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });

});
