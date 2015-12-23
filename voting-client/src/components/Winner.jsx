import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Winner = React.createClass({
  mixins: [PureRenderMixin],
  render() {
    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );
  }
});

export default Winner;
