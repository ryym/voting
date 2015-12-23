import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Entry from './Entry';
import Entries from './Entries';
import Winner from './Winner';

const Results = React.createClass({
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

export default Results;
