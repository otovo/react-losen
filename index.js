'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var log = _interopDefault(require('loglevel'));
var PropTypes = _interopDefault(require('prop-types'));

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      stepData: {}
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
    var _this = this;

    return {
      activeStep: this.state.activeStep,
      isFirstStep: this.state.isFirstStep,
      isLastStep: this.state.isLastStep,

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
      changeStep: (() => {
        var _ref = _asyncToGenerator(function* (newDirection) {
          const { activeStep, stepData, steps } = _this.state;
          const { onStepChange } = _this.props;

          try {
            if (newDirection === 'next' || newDirection === 'complete') {
              if (typeof activeStep.validator === 'function') {
                yield activeStep.validator();
              }
            }

            if (newDirection === 'complete') {
              _this.onComplete();
            } else {
              const direction = newDirection || _this.state.direction;
              const nextStep = getSafeNext(_this.state.activeStepIndex, _this.state.steps, direction);

              const prevStepName = activeStep.name;
              const nextStepName = steps[nextStep].name;
              if (onStepChange && !steps[nextStep].autoSkip) {
                onStepChange(prevStepName, nextStepName, stepData);
              }

              _this.setState({
                activeStep: _this.state.steps[nextStep] || emptyStep,
                activeStepIndex: nextStep,
                direction,
                isFirstStep: nextStep < 1,
                isLastStep: nextStep === findLastValidStepIndex(_this.state.steps, nextStep)
              }, _this.stateDebugger);
            }
          } catch (error) {
            if (_this.props.onError) {
              _this.props.onError(error);
            }
          }
        });

        return function changeStep(_x) {
          return _ref.apply(this, arguments);
        };
      })()
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

var entry = {
    Wizard,
    Step,
    Controls
};

module.exports = entry;
