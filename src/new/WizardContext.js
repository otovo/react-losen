// @flow
import { createContext } from 'react';

export type StepType = {
  name: string,
};

export type ContextType = ?{|
  stepList: Array<StepType>,
|};

export const WizardContext = createContext<ContextType>(null);
