// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node,
  disabled?: boolean,
};

const Button = ({ children, disabled, ...rest }: Props) => (
  <button
    type="button"
    className={`f5 no-underline inline-flex items-center pa3 ba border-box mr4 bg-transparent pointer
      ${disabled ? 'black-50' : 'black'}`}
    disabled={disabled}
    {...rest}>
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
