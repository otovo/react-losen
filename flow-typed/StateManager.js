// @flow

declare type Losen$StateManager = {|
  updateStep: (currentStepName: string, nextStepName: string) => void,
  getActiveStep: () => string,
  getItem: (key: string) => string,
  setItem: (key: string, value: string) => void,
|};
