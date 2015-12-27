import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Vote = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    const pair = this.props.pair || [];
    return (
      <div>
        {pair.map(entry =>
          this.renderButton(entry)
        )}
      </div>
    );
  },

  renderButton(entry) {
    return (
     <button
       key={entry}
       onClick={() => this.props.vote(entry)}
      >
        <h1>{entry}</h1>
        {this.renderVotedLabel(entry)}
      </button>
    );
  },

  renderVotedLabel(entry) {
    return (
      this.hasVotedFor(entry) ?
        <div className="label">Voted</div> : null
    );
  },

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }
});

export default Vote;
