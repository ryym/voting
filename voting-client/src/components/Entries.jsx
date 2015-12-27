import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Set } from 'immutable';
import Entry from './Entry';

const Entries = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const { pair, votes, next } = this.props;
    return (
      <div>
        <div className="tally">
          {pair.map(entry =>
            <Entry
              key={entry}
              entry={entry}
              voteCount={votes.get(entry, Set()).size}
            />
          )}
        </div>
        <div className="management">
          <button className="next" onClick={next}>
            Next
          </button>
        </div>
      </div>
    );
  }
});

export default Entries;
