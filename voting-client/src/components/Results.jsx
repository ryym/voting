import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { next } from '../action_creators';
import Entry from './Entry';
import Entries from './Entries';
import Winner from './Winner';

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair'], List()),
    votes: state.getIn(['vote', 'votes'], Map()),
    winner: state.get('winner')
  };
}

export const Results = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const winner = this.props.winner;
    return (
      <div className="results">
        {
          winner ?
            <Winner ref="winner" winner={winner} /> :
            <Entries {...this.props} />
        }
      </div>
    );
  }
});

export const ResultsContainer = connect(
  mapStateToProps,
  { next }
)(Results);
