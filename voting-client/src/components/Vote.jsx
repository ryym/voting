import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

const Vote = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    const pair = this.props.pair || [];
    return (
      <div className="vote-pair">
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
       className={classNames({
         vote: true,
         voted: this.hasVotedFor(entry)
       })}
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
