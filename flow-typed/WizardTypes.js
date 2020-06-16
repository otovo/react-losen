// @flow

type Losen$StepTypes = 'next' | 'previous' | 'complete';
declare type Losen$Direction = ?Losen$StepTypes;

declare type Losen$ValidatorFunction = () => Promise<React$Node>;

declare type Losen$Step = {|
  name: string,
  validator: ?Losen$ValidatorFunction,
  autoSkip: ?boolean,
  state: ?Array<{| [string]: string |}>,
|};
