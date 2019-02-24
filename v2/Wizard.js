// @flow
import React, { createContext, useState, useContext, useEffect } from 'react';

export const WizardContext = createContext(null);

export function useStepContext() {
  return useContext(WizardContext);
}

export function useControlsContext() {
  return useContext(WizardContext);
}

type Props = {
  // onComplete: (wizardData: Object, currentStep: string) => void,
  // onStepChange: OnStepChangeType => void,
  // debug?: boolean,
  // render: (stepData: Object, func: OnPartialChange) => Node,
  // onError?: (error: Object) => void,
  children: React$Node,
};

type State = {
  activeStep: Losen$Step,
  activeStepIndex: number,
  direction: Losen$Direction,
  isFirstStep: boolean,
  isLastStep: boolean,
  steps: Array<Losen$Step>,
  // stepData: Object,
};

const Wizard = ({ children }: Props) => {
  const [activeStep, setActiveStep] = useState({});
  const [steps, setSteps] = useState([]);

  const registerStep = step => {
    if (Array.isArray(steps)) {
      setSteps(steps.push(step));
      console.log(steps);
    }
  };

  useEffect(() => {
    if (!Object.keys(activeStep).length) {
      setActiveStep(steps[0]);
    }
  });

  return (
    <WizardContext.Provider value={{ registerStep, activeStep }}>
      {children}
    </WizardContext.Provider>
  );
};

export default Wizard;
