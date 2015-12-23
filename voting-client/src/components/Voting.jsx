import React from 'react';

export default class Voting extends React.Component {
  render() {
    const pair = this.props.pair || [];
    return (
      <div className="voting">
        {
          pair.map(entry =>
           <button
             key={entry}
             onClick={() => this.props.vote(entry)}
            >
              <h1>{entry}</h1>
            </button>
          )
        }
      </div>
    )
  }
}
