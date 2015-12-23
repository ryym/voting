import React from 'react';

export default class Voting extends React.Component {
  render() {
    const pair = this.props.pair || [];
    const isDisabled = !! this.props.hasVoted;
    return (
      <div className="voting">
        {
          pair.map(entry =>
           <button
             key={entry}
             disabled={isDisabled}
             onClick={() => this.props.vote(entry)}
            >
              <h1>{entry}</h1>
              {
                this.hasVotedFor(entry) ?
                  <div className="label">Voted</div> : null
              }
            </button>
          )
        }
      </div>
    )
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }
}
