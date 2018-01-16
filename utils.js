// @flow
export type Direction = '' | 'next' | 'previous' | 'complete';

export type ValidatorFunction = () => string;

export type StepProps = {
  onValid?: (data?: any) => void,
  stepData: Object,
  name: string,
  skipStep: () => void,
};

export type Context = {
  activeStep: string,
  enableNext: boolean,
  isFirstStep: boolean,
  isLastStep: boolean,
  stepData: Object,
  changeStep: (direction: Direction) => void,
  onValid: () => void,
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
