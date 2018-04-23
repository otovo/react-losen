// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node,
  disabled?: boolean,
};

const Button = ({ children, disabled = false, ...rest }: Props = {}) => (
  <button
    className={`f5 no-underline inline-flex items-center pa3 ba border-box mr4 bg-transparent pointer
      ${disabled ? 'black-50' : 'black'}`}
    disabled={disabled}
    {...rest}>
    {children}
  </button>
);

export default Button;
