// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { type Context, type ValidatorFunction } from './utils';

type Props = {
  autoSkip?: boolean,
  children: React.Node,
  name: string,
  validator?: ValidatorFunction,
  disableNextStep?: boolean,
};

/*
 This component accepts a name acts as a context provider between Wizard and it's children.
 It adds a prop onValid(any) to it's children which is used to report to the wizard that we are 
 ready to advance to next step.
 
*/

class Step extends React.Component<Props> {
  static defaultProps = {
    autoSkip: false,
  };

  componentDidMount() {
    this.context.registerStep(this.props.name, this.props.validator);
    if (this.props.disableNextStep) {
      this.context.disableNext();
    }
  }

  componentWillReceiveProps(nextProps: Props, nextContext: Context) {
    if (
      nextContext.activeStep.name === this.props.name &&
      this.props.autoSkip
    ) {
      this.context.changeStep('');
    }
  }

  skipStep = () => {
    this.context.changeStep('');
  };

  stepIsValid = (data?: any) => {
    const stepData = data ? { [this.props.name]: data } : {};
    this.context.onValid(stepData);
  };

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
  onValid: PropTypes.func.isRequired,
  registerStep: PropTypes.func.isRequired,
  disableNext: PropTypes.func.isRequired,
};

export default Step;
