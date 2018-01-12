// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { getSafeNext, type Direction } from './utils';

type Props = {
  children: React.Node,
  onComplete: Object => void,
};

type State = {
  activeStep: string,
  activeStepIndex: number,
  direction: Direction,
  enableNext: boolean,
  isFirstStep: boolean,
  isLastStep: boolean,
  steps: Array<string>,
  stepData: Object,
};

class Wizard extends React.Component<Props, State> {
  state = {
    activeStep: '',
    activeStepIndex: 0,
    direction: '',
    enableNext: false,
    isFirstStep: true,
    isLastStep: false,
    steps: [],
    stepData: {},
  };

  getChildContext() {
    return {
      activeStep: this.state.activeStep,
      enableNext: this.state.enableNext,
      isFirstStep: this.state.isFirstStep,
      isLastStep: this.state.isLastStep,

      /*
        Called in componentDidMount() lifecycle of Step.js
        It sets the FIRST_ELEMENT to make the wizard always start at the first registered Step element.
        
        Note: The first element to register is implicitly a start_step (as is the last one a finishing_step).
      */

      registerStep: (name: string) => {
        const FIRST_ELEMENT = 0;
        this.setState((prevState: State) => ({
          ...prevState,
          activeStep: prevState.steps[FIRST_ELEMENT] || name,
          activeStepIndex: FIRST_ELEMENT,
          steps: [...prevState.steps, name],
        }));
      },

      // Called when a step is valid
      onValid: (data: Object) => {
        this.setState(prevState => ({
          ...prevState,
          enableNext: true,
          stepData: {
            ...prevState.stepData,
            ...data,
          },
        }));
      },

      /*
        Main usage: Used by Controls.js when clicking either next or previous button.
        Secondary: Called from Step.js if autoSkip prop is true. This is why we store the direction

        // TODO: Direction should probably be renamed. Can be of type <'' | 'next' | 'previous' | 'complete'>
      */
      changeStep: (newDirection?: Direction) => {
        if (newDirection === 'complete') {
          return this.onComplete();
        }

        const direction = newDirection || this.state.direction;
        const nextStep = getSafeNext(
          this.state.activeStepIndex,
          this.state.steps.length,
          direction,
        );

        return this.setState({
          activeStep: this.state.steps[nextStep] || '',
          activeStepIndex: nextStep,
          direction,
          enableNext: nextStep < 1,
          isFirstStep: nextStep < 1,
          isLastStep: nextStep === this.state.steps.length - 1,
        });
      },
    };
  }

  componentDidMount() {
    /*
      TODO: It would be nice to throw an error if less than two steps are registered.
      Only problem is that we cant neccesary know when we're done adding steps. Because
      setState() is async, the setState in registerSteps is finished after the 
      componentDidMount lifecycle hook is called.

      setTimeout() maybe? But this is kinda ugly and probably error prone...
 
      */
    // if (this.state.steps.length < 2) {
    //   throw new Error('A wizard needs at least two steps');
    // }
  }

  onComplete = () => {
    this.props.onComplete(this.state.stepData);
  };

  render() {
    return this.props.children;
  }
}

Wizard.childContextTypes = {
  activeStep: PropTypes.string.isRequired,
  changeStep: PropTypes.func.isRequired,
  enableNext: PropTypes.bool.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  onValid: PropTypes.func.isRequired,
  registerStep: PropTypes.func.isRequired,
};

export default Wizard;
