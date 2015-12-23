import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Entry from './Entry';

const Entries = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const { pair, tally, next } = this.props;
    return (
      <div>
        <div className="tally">
          {pair.map(entry =>
            <Entry
              key={entry}
              entry={entry}
              voteCount={tally.get(entry)}
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
