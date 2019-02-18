// @flow
import { type Node } from 'react';

type StepTypes = 'next' | 'previous' | 'complete';
export type Direction = ?StepTypes;

export type ValidatorFunction = () => ?Node;

export type OnChangeType = (data: any) => void;
export type OnPartialChange = (name: string) => OnChangeType;

export type WizardStep = {
  name: string,
  validator: ?ValidatorFunction,
  autoSkip: ?boolean,
};

export type Context = {
  activeStep: WizardStep,
  isFirstStep: boolean,
  isLastStep: boolean,
  changeStep: (direction: Direction) => Promise<void>,
  updateStep: (name: string, updateData: Object) => void,
  registerStep: (
    name: string,
    validator?: ValidatorFunction,
    autoSkip?: boolean,
  ) => void,
};

/*
  Function `findLastValidStepIndex()`
    Iterates over the n last steps (starting from nextStep index) and returns the last index
    where autoSkip property is not true.
*/
export const findLastValidStepIndex = (
  steps: Array<WizardStep>,
  startIndex?: number = 0,
) => {
  let last = startIndex;
  steps.slice(startIndex).forEach((el, index) => {
    if (!el.autoSkip) {
      last = startIndex + index;
    }
  });
  return last;
};

export const getSafeNext = (
  currentIndex: number,
  steps: Array<WizardStep>,
  direction: Direction,
) => {
  const numberOfSteps = steps.length;
  const nextStep =
    direction === 'previous' ? currentIndex - 1 : currentIndex + 1;

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
