// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { type Context, type ValidatorFunction } from './utils';

type Props = {
  autoSkip?: boolean,
  children: React.Node,
  name: string,
  validator?: ValidatorFunction,
};

/*
 This component accepts a name acts as a context provider between Wizard and it's children.
 It register itself on mount and accepts a validator prop. This can be used by the wizard to 
 validate if it's cool to advance to the next step.
*/

class Step extends React.Component<Props> {
  context: Context;

  static defaultProps = {
    autoSkip: false,
  };

  componentDidMount() {
    this.context.registerStep(
      this.props.name,
      this.props.validator,
      this.props.autoSkip,
    );
  }

  componentWillReceiveProps(nextProps: Props, nextContext: Context) {
    if (
      nextContext.activeStep.name === this.props.name &&
      this.props.autoSkip
    ) {
      this.context.changeStep();
    }

    if (nextProps.autoSkip !== this.props.autoSkip) {
      // autoskip has changed. Lets notify the wizard
      this.context.updateStep(this.props.name, {
        autoSkip: nextProps.autoSkip,
      });
    }
  }

  render() {
    if (this.context.activeStep.name === this.props.name) {
      return this.props.children;
    }
    return null;
  }
}

Step.contextTypes = {
  activeStep: PropTypes.shape({
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
  }).isRequired,
  changeStep: PropTypes.func.isRequired,
  registerStep: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default Step;
