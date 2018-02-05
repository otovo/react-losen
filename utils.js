// @flow
type StepTypes = 'next' | 'previous' | 'complete';
export type Direction = ?StepTypes;

export type ValidatorFunction = () => ?string;

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
  errorMessage: string,
  changeStep: (direction: Direction) => void,
  updateStep: (name: string, updateData: Object) => void,
  registerStep: (
    name: string,
    validator?: ValidatorFunction,
    autoSkip?: boolean,
  ) => void,
};

export type ButtonValues = {
  start: string,
  finish: string,
  default: string,
};

export const getButtonText = (texts: ButtonValues, context: Context) => {
  if (context.isFirstStep) {
    return texts.start;
  }
  if (context.isLastStep) {
    return texts.finish;
  }
  return texts.default;
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
