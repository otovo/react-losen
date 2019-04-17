// @flow
import React, { useState, useEffect } from 'react';

import { findNextValid, findPreviousValid } from './utils';
import { ControlsContext } from './Controls';
import { StepContext } from './Step';

export class ValidationError extends Error {}

type Props = {
  onComplete: (currentStep: string) => void,
  children: React$Node,
  debug?: Boolean,
};

const Wizard = ({ children, onComplete, debug }: Props) => {
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  function registerStep(step) {
    const alreadyRegistered = steps.map(el => el.name).includes(step.name);
    if (!alreadyRegistered) {
      setSteps(prevSteps => [...prevSteps, step]);
    }
  }

  function updateStep(step) {
    const stepIndex = steps.findIndex(el => el.name === step.name);
    setSteps(prevSteps => [
      ...prevSteps.slice(0, stepIndex),
      step,
      ...prevSteps.slice(stepIndex + 1),
    ]);
  }

  async function onNext() {
    const { validator } = steps[index];
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
  }

  function onPrevious() {
    const prev = findPreviousValid(steps, index);
    setIndex(prev);
  }

  useEffect(() => {
    // for debugging purposes only
    if (debug) {
      console.debug('steps updated', steps); // eslint-disable-line
    }
  }, [steps]);

  return (
    <ControlsContext.Provider
      value={{
        onNext,
        onPrevious,
        isLoading,
        isFirst: findPreviousValid(steps, index) === index,
        isLast: findNextValid(steps, index) === index,
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
};
export default Wizard;
