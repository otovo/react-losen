// @flow
export type Direction = '' | 'next' | 'previous' | 'complete';

export type ValidatorFunction = () => string;

export type OnChangeType = (data: any) => void;
export type OnPartialChange = (name: string) => OnChangeType;

export type WizardStep = {
  name: string,
  validator: ?ValidatorFunction,
};

export type Context = {
  activeStep: WizardStep,
  isFirstStep: boolean,
  isLastStep: boolean,
  errorMessage: string,
  changeStep: (direction: Direction) => void,
  registerStep: (name: string) => void,
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

export const getSafeNext = (
  currentIndex: number,
  numberOfSteps: number,
  direction: Direction,
) => {
  const nextStep =
    direction === 'previous' ? currentIndex - 1 : currentIndex + 1;

  if (nextStep < 0) {
    return 0;
  }
  if (nextStep >= numberOfSteps) {
    return numberOfSteps - 1;
  }
  return nextStep;
};
