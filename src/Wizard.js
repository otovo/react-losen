// @flow
import React, { useState, useEffect } from 'react';

import { findNextValid, findPreviousValid } from './utils';
import { ControlsContext } from './Controls';
import Step, { StepContext } from './Step';
import StateManager from './StateManager';

export class ValidationError extends Error {}

type Props = {|
  onComplete: (currentStep: string) => void,
  children: React$Node,
  debug?: boolean,
  stateManager?: string,
|};

const Wizard = ({ children, onComplete, stateManager, debug }: Props) => {
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState<Array<typeof Step>>([]);
  const [isLoading, setLoadingState] = useState(false);

  const href = typeof window === 'undefined' ? '' : window.location.href;

  const state = new StateManager(stateManager || '');

  function registerStep(step) {
    const alreadyRegistered = steps.map(el => el.name).includes(step.name);
    if (!alreadyRegistered) {
      setSteps(previousSteps => [...previousSteps, step]);
    }
  }

  function updateStep(step) {
    const stepIndex = steps.findIndex(el => el.name === step.name);
    setSteps(previousSteps => [
      ...previousSteps.slice(0, stepIndex),
      step,
      ...previousSteps.slice(stepIndex + 1),
    ]);
  }

  async function onNext() {
    const { validator } = steps[index]; // TODO
    const next = findNextValid(steps, index);

    const nextAction =
      next === index
        ? () => onComplete(steps[index].name)
        : () => setIndex(next);

    if (validator) {
      try {
        setLoadingState(true);
        await validator();
        nextAction();
      } catch (error) {
        if (error instanceof ValidationError) {
          console.error('ReactLosen', error); // eslint-disable-line
        } else {
          throw error;
        }
      } finally {
        setLoadingState(false);
      }
    } else {
      nextAction();
    }

    if (state.mode) {
      const currentStep = steps[index];
      const nextStep = steps[index + 1];
      state.updateHistory(currentStep.name, nextStep.name);
    }
  }

  function onPrevious() {
    const prev = findPreviousValid(steps, index);
    setIndex(prev);

    if (state.mode) {
      const currentStep = steps[index];
      const previousStep = steps[index - 1];
      state.updateHistory(currentStep.name, previousStep.name);
    }
  }

  useEffect(() => {
    // for debugging purposes only
    if (debug) {
      console.debug('steps updated', steps); // eslint-disable-line
    }

    if (state.mode) {
      const activeStep = state.getActiveStep();
      const activeIndex = steps.findIndex(step => step.name === activeStep);
      setIndex(activeIndex > -1 ? activeIndex : 0);
    }
  }, [steps, href, setIndex]);

  return (
    <ControlsContext.Provider
      value={{
        onNext,
        onPrevious,
        isLoading,
        isFirst: findPreviousValid(steps, index) === index,
        isLast: findNextValid(steps, index) === index,
        activeIndex: index,
      }}>
      <StepContext.Provider
        value={{
          registerStep,
          activeStep: steps[index] || {},
          initialized: !!steps[index],
          updateStep,
        }}>
        {children}
      </StepContext.Provider>
    </ControlsContext.Provider>
  );
};

Wizard.defaultProps = {
  debug: false,
  stateManager: false,
};
export default Wizard;
