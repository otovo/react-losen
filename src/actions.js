import { findNextValid } from './utils';

class ValidationError extends Error {}

export function registerStep(step) {
  return {
    type: 'REGISTER_STEP',
    step,
  };
}

export function updateStep(step) {
  return {
    type: 'UPDATE_STEP',
    step,
  };
}

export function onPrevious() {
  return {
    type: 'PREVIOUS_STEP',
  };
  // if (stateManager) {
  //   const currentStep = steps[index];
  //   const previousStep = steps[index - 1];
  //   stateManager.updateStep(currentStep.name, previousStep.name);
  // }
}

function onComplete(completeFn) {
  return (dispatch, getState) => {
    const { steps, index } = getState();
    dispatch({ type: 'WIZARD_COMPLETED' });
    completeFn(steps[index].name);
  };
}

export function onNext(completeFn) {
  return async (dispatch, getState) => {
    const { steps, index } = getState();
    const { validator } = steps[index];
    const nextIndex = findNextValid(steps, index);
    const isLastStep = nextIndex === index;

    if (!validator) {
      if (isLastStep) {
        return dispatch(onComplete(completeFn));
      }
      return dispatch({ type: 'NEXT_STEP', nextIndex });
    }

    try {
      dispatch({ type: 'VALIDATING_STEP' });
      await validator();
      if (isLastStep) {
        return dispatch(onComplete(completeFn));
      }
      return dispatch({ type: 'VALIDATE_SUCCESS', nextIndex });
    } catch (error) {
      dispatch({ type: 'VALIDATE_FAILED', nextIndex });
      if (error instanceof ValidationError) {
        console.error('ReactLosen', error); // eslint-disable-line
      } else {
        throw error;
      }
    }
    return null;

    // if (stateManager) {
    //   const currentStep = steps[index];
    //   const nextStep = steps[index + 1];
    //   stateManager.updateStep(currentStep.name, nextStep.name);
  };
}
