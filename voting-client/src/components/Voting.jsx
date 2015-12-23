import React from 'react';
import Vote from './Vote';
import Winner from './Winner';

const Voting = React.createClass({
  render() {
    const pair = this.props.pair || [];
    const isDisabled = !! this.props.hasVoted;
    return (
      <div className="voting">
        { // 'ref' for Winner is used in unit tests.
          this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Vote {...this.props} />
        }
      </div>
    );
  }
});

export default Voting;
