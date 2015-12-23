import React from 'react';
import Vote from './Vote';

export default class Voting extends React.Component {
  render() {
    const pair = this.props.pair || [];
    const isDisabled = !! this.props.hasVoted;
    return (
      <div className="voting">
        <Vote {...this.props} />
      </div>
    );
  }
}
