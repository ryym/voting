import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Vote from './Vote';
import Winner from './Winner';

const Voting = React.createClass({
  mixins: [PureRenderMixin],
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
