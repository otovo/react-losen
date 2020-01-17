// @flow

export type Losen$StateManager = {|
  updateStep: (currentStepName: string, nextStepName: string) => void,
  getActiveStep: () => int,
  getItem: (key: string) => string,
  setItem: (key: string, value: string) => void,
|};
