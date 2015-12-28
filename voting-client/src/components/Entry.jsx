import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Entry = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    const { entry, voteCount } = this.props;
    return (
      <div className="entry">
        <h1 className="entry-name">
          {entry}
        </h1>
        <div className="vote-visualization">
          <div className="votes-block"></div>
        </div>
        <div className="vote-count">
          {voteCount || 0}
        </div>
      </div>
    );
  }
});

export default Entry;
