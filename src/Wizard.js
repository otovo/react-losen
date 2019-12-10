// @flow
import React, { useState, useEffect } from 'react';

import { findNextValid, findPreviousValid } from './utils';
import { ControlsContext } from './Controls';
import { StepContext } from './Step';

export class ValidationError extends Error {}

type Props = {
  onComplete: (currentStep: string) => void,
  children: React$Node,
  debug?: boolean,
  updateUrl?: boolean,
};

const Wizard = ({ children, onComplete, updateUrl, debug }: Props) => {
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  const href = typeof window === 'undefined' ? '' : window.location.href;

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

  function updateHistory(currentStepName, nextStepName) {
    const currentUrl = window.location.href;
    const basePath = currentUrl.includes('?')
      ? currentUrl.split('?')[0]
      : currentUrl;
    const searchParams = new URLSearchParams(new URL(currentUrl).searchParams);
    searchParams.set('step', nextStepName);

    window.history.pushState({ activeStep: currentStepName }, '', currentUrl);
    window.history.replaceState(
      { activeStep: nextStepName },
      '',
      `${basePath}?${searchParams.toString()}`,
    );
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

    if (!updateUrl) return;

    const currentStep = steps[index];
    const nextStep = steps[index + 1];
    updateHistory(currentStep.name, nextStep.name);
  }

  function onPrevious() {
    const prev = findPreviousValid(steps, index);
    setIndex(prev);

    if (!updateUrl) return;

    const currentStep = steps[index];
    const previousStep = steps[index - 1];
    updateHistory(currentStep.name, previousStep.name);
  }

  useEffect(() => {
    // for debugging purposes only
    if (debug) {
      console.debug('steps updated', steps); // eslint-disable-line
    }

    if (!updateUrl) return;

    const searchParams = new URLSearchParams(new URL(href).searchParams);
    const activeStep = searchParams.get('step');
    const activeIndex = steps.findIndex(step => step.name === activeStep);
    setIndex(activeIndex === -1 ? 0 : activeIndex);
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
  updateUrl: false,
};
export default Wizard;
