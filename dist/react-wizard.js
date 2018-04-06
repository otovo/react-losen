define(['react', 'loglevel', 'prop-types'], function (React, log, PropTypes) { 'use strict';

  log = log && log.hasOwnProperty('default') ? log['default'] : log;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  // 

  /*
    Function `findLastValidStepIndex()`
      Iterates over the n last steps (starting from nextStep index) and returns the last index
      where autoSkip property is not true.
  */
  const findLastValidStepIndex = (steps, startIndex = 0) => {
    let last = startIndex;
    steps.slice(startIndex).forEach((el, index) => {
      if (!el.autoSkip) {
        last = startIndex + index;
      }
    });
    return last;
  };

  const getSafeNext = (currentIndex, steps, direction) => {
    const numberOfSteps = steps.length;
    const nextStep = direction === 'previous' ? currentIndex - 1 : currentIndex + 1;

    if (nextStep < 0) {
      return 0;
    }
    const lastValidStep = findLastValidStepIndex(steps);

    if (lastValidStep < nextStep) {
      return lastValidStep;
    }

    if (nextStep >= numberOfSteps) {
      return numberOfSteps - 1;
    }

    return nextStep;
  };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  const emptyStep = {
    name: '',
    validator: () => '',
    autoSkip: null
  };

  class Wizard extends React.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {
        activeStep: emptyStep,
        activeStepIndex: 0,
        direction: null,
        isFirstStep: true,
        isLastStep: false,
        steps: [],
        stepData: {},
        errorNode: null
      }, this.showErrorMessage = errorMsgNode => {
        if (errorMsgNode) {
          this.setState({
            errorNode: errorMsgNode
          });
        }
      }, this.stateDebugger = () => {
        if (this.props.debug) {
          log.debug('WIZARD STATE UPDATED', this.state);
        }
      }, this.onPartialChange = name => data => {
        const newStepData = data !== 'undefined' ? { [name]: data } : {};
        this.setState(prevState => _extends({}, prevState, {
          stepData: _extends({}, prevState.stepData, newStepData)
        }), this.stateDebugger);
      }, this.onComplete = () => {
        this.props.onComplete(this.state.stepData, this.state.activeStep.name);
      }, _temp;
    }

    getChildContext() {
      return {
        activeStep: this.state.activeStep,
        isFirstStep: this.state.isFirstStep,
        isLastStep: this.state.isLastStep,
        errorNode: this.state.errorNode,

        dismissError: () => {
          this.setState({
            errorNode: null
          });
        },

        /*
          Called in componentDidMount() lifecycle of Step.js
          It sets the FIRST_ELEMENT to make the wizard always start at the first registered Step element.
           Note: The first element to register is implicitly a start_step (as is the last one a finishing_step).
        */

        registerStep: (name, validateFunction, autoSkip) => {
          const FIRST_ELEMENT = 0;
          this.setState(prevState => _extends({}, prevState, {
            activeStep: prevState.steps[FIRST_ELEMENT] || name,
            activeStepIndex: FIRST_ELEMENT,
            steps: [...prevState.steps, { name, validator: validateFunction, autoSkip }]
          }));
        },

        // This function finds and updates data in a given step in an immutable fashion
        updateStep: (name, updatedData) => {
          const stepIndex = this.state.steps.findIndex(el => el.name === name);
          this.setState(prevState => ({
            steps: [...prevState.steps.slice(0, stepIndex), _extends({}, prevState.steps[stepIndex], updatedData), ...prevState.steps.slice(stepIndex + 1)]
          }));
        },

        /*
          Main usage: Used by Controls.js when clicking either next or previous button.
          Secondary: Called from Step.js if autoSkip prop is true. This is why we store the direction
           // TODO: Direction should probably be renamed. Can be of type <'' | 'next' | 'previous' | 'complete'>
        */
        changeStep: newDirection => {
          const { activeStep, stepData, steps } = this.state;
          const { onStepChange } = this.props;

          if (typeof activeStep.validator === 'function' && !!activeStep.validator()) {
            if (newDirection === 'next' || newDirection === 'complete') {
              const validationResult = activeStep.validator();
              return this.showErrorMessage(validationResult);
            }
          }

          if (newDirection === 'complete') {
            return this.onComplete();
          }

          const direction = newDirection || this.state.direction;
          const nextStep = getSafeNext(this.state.activeStepIndex, this.state.steps, direction);

          const prevStepName = activeStep.name;
          const nextStepName = steps[nextStep].name;
          if (onStepChange && !steps[nextStep].autoSkip) {
            onStepChange(prevStepName, nextStepName, stepData);
          }

          return this.setState({
            activeStep: this.state.steps[nextStep] || emptyStep,
            activeStepIndex: nextStep,
            direction,
            isFirstStep: nextStep < 1,
            isLastStep: nextStep === findLastValidStepIndex(this.state.steps, nextStep),
            errorNode: null
          }, this.stateDebugger);
        }
      };
    }

    render() {
      return this.props.render(this.state.stepData, this.onPartialChange);
    }
  }

  Wizard.defaultProps = {
    onStepChange: () => {}
  };
  Wizard.childContextTypes = {
    activeStep: PropTypes.shape({
      name: PropTypes.string.isRequired,
      validator: PropTypes.func
    }).isRequired,
    changeStep: PropTypes.func.isRequired,
    isFirstStep: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    registerStep: PropTypes.func.isRequired,
    errorNode: PropTypes.node,
    dismissError: PropTypes.func.isRequired,
    updateStep: PropTypes.func.isRequired
  };

  // 

  /*
   This component accepts a name acts as a context provider between Wizard and it's children.
   It register itself on mount and accepts a validator prop. This can be used by the wizard to 
   validate if it's cool to advance to the next step.
  */

  class Step extends React.Component {

    componentDidMount() {
      this.context.registerStep(this.props.name, this.props.validator, this.props.autoSkip);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.activeStep.name === this.props.name && this.props.autoSkip) {
        this.context.changeStep();
      }

      if (nextProps.autoSkip !== this.props.autoSkip) {
        // autoskip has changed. Lets notify the wizard
        this.context.updateStep(this.props.name, {
          autoSkip: nextProps.autoSkip
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

  Step.defaultProps = {
    autoSkip: false
  };
  Step.contextTypes = {
    activeStep: PropTypes.shape({
      name: PropTypes.string.isRequired,
      validator: PropTypes.func
    }).isRequired,
    changeStep: PropTypes.func.isRequired,
    registerStep: PropTypes.func.isRequired,
    updateStep: PropTypes.func.isRequired
  };

  // 

  /**
   * Wizard Controls
   *
   * Provides the neccessary functions for controlling the wizard through a render-prop
   */

  class Controls extends React.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.changeStep = direction => {
        this.context.changeStep(direction);
      }, this.onNext = () => {
        if (this.context.isLastStep) {
          this.context.changeStep('complete');
        } else {
          this.context.changeStep('next');
        }
      }, this.onPrevious = () => {
        if (!this.context.isFirstStep) {
          this.context.changeStep('previous');
        }
      }, _temp;
    }

    render() {
      const { isFirstStep, isLastStep } = this.context;
      return this.props.render(this.onNext, this.onPrevious, isFirstStep, isLastStep);
    }
  }

  Controls.contextTypes = {
    changeStep: PropTypes.func.isRequired,
    isFirstStep: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired
  };

  var index = {
      Wizard,
      Step,
      Controls
  };

  return index;

});
