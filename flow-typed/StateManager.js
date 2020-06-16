// @flow

declare type Losen$StateManager = {|
  updateStep: (currentStepName: string, nextStepName: string) => void,
  getActiveStep: () => number,
  getItem: (key: string) => string,
  setItem: (key: string, value: string) => void,
|};
