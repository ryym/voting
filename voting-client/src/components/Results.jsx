import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Results = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const pair = this.props.pair || [];
    return (
      <div className="results">
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
