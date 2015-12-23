import React from 'react';

const Winner = React.createClass({
  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
});

export default Winner;
