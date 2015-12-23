import React from 'react';
import { List } from 'immutable';

// XXX: Hard coding for now.
const pair = List.of('Trainspotting', '28 Days Later');

export default React.createClass({
  render() {
    return React.cloneElement(this.props.children, { pair });
  }
});
