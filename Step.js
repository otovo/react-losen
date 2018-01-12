// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { type Context } from './utils';

type Props = {
  autoSkip?: boolean,
  children: React.Element<any>,
  name: string,
};

/*
 This component accepts a name acts as a context provider between Wizard and it's children.
 It adds a prop onValid(any) to it's children which is used to report to the wizard that we are 
 ready to advance to next step.
 
 TODO: Add onError(msg) prop that makes it possible to report errors
*/

class Step extends React.Component<Props> {
  static defaultProps = {
    autoSkip: false,
  };

  componentDidMount() {
    this.context.registerStep(this.props.name);
  }

  componentWillReceiveProps(nextProps: Props, nextContext: Context) {
    if (nextContext.activeStep === this.props.name && this.props.autoSkip) {
      this.context.changeStep('');
    }
  }

  render() {
    if (this.context.activeStep === this.props.name) {
      return React.cloneElement(this.props.children, {
        onValid: (data?: any) => {
          const stepData = data ? { [this.props.name]: data } : {};
          this.context.onValid(stepData);
        },
      });
    }
    return null;
  }
}

Step.contextTypes = {
  activeStep: PropTypes.string.isRequired,
  changeStep: PropTypes.func.isRequired,
  onValid: PropTypes.func.isRequired,
  registerStep: PropTypes.func.isRequired,
};

export default Step;
