import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner';

const Results = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const pair = this.props.pair || [];
    const winner = this.props.winner;
    return (
      <div className="results">
        {
          winner ?
            <Winner ref="winner" winner={winner} /> :
            this.renderEntries(pair)
        }
      </div>
    );
  },

  renderEntries(pair) {
    return (
      <div>
        <div className="tally">
          {pair.map(this.renderEntry)}
        </div>
        <div className="management">
          <button
            ref="next"
            className="next"
            onClick={this.props.next}
            >
            Next
          </button>
        </div>
      </div>
    );
  },

  renderEntry(entry) {
    return (
      <div key={entry} className="entry">
        <h1 className="entry-name">
          {entry}
        </h1>
        <div className="vote-count">
          {this.getVotes(entry)}
        </div>
      </div>
    );
  },

  getVotes(entry) {
    const { tally } = this.props;
    return tally ? tally.get(entry, 0) : 0;
  }
});

export default Results;
