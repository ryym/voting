import React from 'react';
import Vote from './Vote';
import Winner from './Winner';

export default class Voting extends React.Component {
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
}
