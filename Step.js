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

 TODO 2: 
    Mayby consider using a render prop instead of automagically passing props down to children. 
    This makes Flow confused, because props are appearing from nowhere.
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

  skipStep = () => {
    this.context.changeStep('');
  };

  stepIsValid = (data?: any) => {
    const stepData = data ? { [this.props.name]: data } : {};
    this.context.onValid(stepData);
  };

  render() {
    // We pass the validator function and stepData down to the first child.
    if (this.context.activeStep === this.props.name) {
      return React.cloneElement(this.props.children, {
        onValid: this.stepIsValid,
        stepData: this.context.stepData,
        name: this.props.name,
        skipStep: this.skipStep,
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
  stepData: PropTypes.object.isRequired,
};

export default Step;
