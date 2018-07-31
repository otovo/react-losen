// @flow
import { type Node } from 'react';

export type StepType = {
  name: string,
};

export type ContextType = ?{|
  stepList: Array<StepType>,
|};

export type WizardProps = {
  children: Node,
};

export type WizardState = {
  context: ContextType,
};
