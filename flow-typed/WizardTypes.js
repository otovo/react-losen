// @flow

type Losen$StepTypes = 'next' | 'previous' | 'complete';
export type Losen$Direction = ?Losen$StepTypes;

export type Losen$ValidatorFunction = () => Promise<React$Node>;

declare type Losen$Step = {
  name: string,
  validator: ?Losen$ValidatorFunction,
  autoSkip: ?boolean,
};
