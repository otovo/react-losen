// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  className: string,
};
type Context = {
  errorMessage: string,
};

const ErrorMessage = (props: Props, context: Context) => (
  <div className={props.className}>
    <span className="h2">{context.errorMessage}</span>
  </div>
);

ErrorMessage.contextTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
