// @flow

export type Losen$StateManager = {|
  updateStep: (currentStepName: string, nextStepName: string) => void,
  getActiveStep: () => int,
|};
