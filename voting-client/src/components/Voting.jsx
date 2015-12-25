import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import Vote from './Vote';
import Winner from './Winner';

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
};

export const Voting = React.createClass({
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

export const VotingContainer = connect(mapStateToProps)(Voting);
