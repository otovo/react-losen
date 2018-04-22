// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node,
};

const Emoji = ({ children: emoji, ...rest }) => (
  <span className="f1" role="img" {...rest}>
    {emoji}
  </span>
);

export default Emoji;
