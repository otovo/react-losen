// @flow
import * as React from 'react';
import log from 'loglevel';
import PropTypes from 'prop-types';
import {
  getSafeNext,
  findLastValidStepIndex,
  type Direction,
  type ValidatorFunction,
  type OnPartialChange,
  type WizardStep,
  type Context,
} from './utils';

const emptyStep = {
  name: '',
  validator: () => '',
  autoSkip: null,
};

type Props = {
  onComplete: Object => void,
  debug?: boolean,
  render: (stepData: Object, func: OnPartialChange) => React.Node,
};

type State = {
  activeStep: WizardStep,
  activeStepIndex: number,
  direction: Direction,
  isFirstStep: boolean,
  isLastStep: boolean,
  steps: Array<WizardStep>,
  stepData: Object,
  errorMessage: string,
};

class Wizard extends React.Component<Props, State> {
  state = {
    activeStep: emptyStep,
    activeStepIndex: 0,
    direction: null,
    isFirstStep: true,
    isLastStep: false,
    steps: [],
    stepData: {},
    errorMessage: '',
  };

  getChildContext(): Context {
    return {
      activeStep: this.state.activeStep,
      isFirstStep: this.state.isFirstStep,
      isLastStep: this.state.isLastStep,
      errorMessage: this.state.errorMessage,

      dismissError: () => {
        this.setState({
          errorMessage: '',
        });
      },

      /*
        Called in componentDidMount() lifecycle of Step.js
        It sets the FIRST_ELEMENT to make the wizard always start at the first registered Step element.
        
        Note: The first element to register is implicitly a start_step (as is the last one a finishing_step).
      */

      registerStep: (
        name: string,
        validateFunction?: ValidatorFunction,
        autoSkip?: boolean,
      ) => {
        const FIRST_ELEMENT = 0;
        this.setState((prevState: State) => ({
          ...prevState,
          activeStep: prevState.steps[FIRST_ELEMENT] || name,
          activeStepIndex: FIRST_ELEMENT,
          steps: [
            ...prevState.steps,
            { name, validator: validateFunction, autoSkip },
          ],
        }));
      },

      // This function finds and updates data in a given step in an immutable fashion
      updateStep: (name, updatedData) => {
        const stepIndex = this.state.steps.findIndex(el => el.name === name);
        this.setState((prevState: State) => ({
          steps: [
            ...prevState.steps.slice(0, stepIndex),
            { ...prevState.steps[stepIndex], ...updatedData },
            ...prevState.steps.slice(stepIndex + 1),
          ],
        }));
      },

      /*
        Main usage: Used by Controls.js when clicking either next or previous button.
        Secondary: Called from Step.js if autoSkip prop is true. This is why we store the direction

        // TODO: Direction should probably be renamed. Can be of type <'' | 'next' | 'previous' | 'complete'>
      */
      changeStep: (newDirection?: Direction) => {
        const { activeStep } = this.state;
        if (
          typeof activeStep.validator === 'function' &&
          !!activeStep.validator()
        ) {
          if (newDirection === 'next' || newDirection === 'complete') {
            const validationResult = activeStep.validator();
            return this.showErrorMessage(validationResult);
          }
        }

        if (newDirection === 'complete') {
          return this.onComplete();
        }

        const direction = newDirection || this.state.direction;
        const nextStep = getSafeNext(
          this.state.activeStepIndex,
          this.state.steps,
          direction,
        );

        return this.setState(
          {
            activeStep: this.state.steps[nextStep] || emptyStep,
            activeStepIndex: nextStep,
            direction,
            isFirstStep: nextStep < 1,
            isLastStep:
              nextStep === findLastValidStepIndex(this.state.steps, nextStep),
            errorMessage: '',
          },
          this.stateDebugger,
        );
      },
    };
  }

  showErrorMessage = (msg: ?string) => {
    if (msg) {
      this.setState({
        errorMessage: msg,
      });
    }
  };

  stateDebugger = () => {
    if (this.props.debug) {
      log.debug('WIZARD STATE UPDATED', this.state);
    }
  };

  onPartialChange = (name: string) => (data: Object) => {
    const newStepData = data ? { [name]: data } : {};
    this.setState(
      prevState => ({
        ...prevState,
        stepData: {
          ...prevState.stepData,
          ...newStepData,
        },
      }),
      this.stateDebugger,
    );
  };

  onComplete = () => {
    this.props.onComplete(this.state.stepData);
  };

  render() {
    return this.props.render(this.state.stepData, this.onPartialChange);
  }
}

Wizard.childContextTypes = {
  activeStep: PropTypes.shape({
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
  }).isRequired,
  changeStep: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  registerStep: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  dismissError: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default Wizard;
