// @flow
import React, { createContext, useContext, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

type Props = {|
  onComplete: (currentStep: string) => void,
  children: React$Node,
  // debug?: boolean,
  // stateManager?: Losen$StateManager,
|};

const WizardContxt = createContext<Object>(null);

export function useWizardContext() {
  const ctx = useContext(WizardContxt);

  if (!ctx) {
    throw new Error(
      'No wizard context found. Please wrap your component in a <WizardRootProvider>...</WizardRootProvider>',
    );
  }
  return ctx;
}

const WizrdRootProvider = ({ children, onComplete }): Props => {
  const allStepsRef = useRef([]);
  const [currentIndex, setStepIndex] = useState(0);
  // const [steps, setSteps] = useState([]);

  function registerStep(stepRef, validator) {
    const newStep = {
      index: allStepsRef.current.length,
      id: nanoid(),
      validator,
    };

    stepRef.current = newStep;
    allStepsRef.current.push(newStep);
  }

  function handleStepChange(nextStepIndex) {
    const currentStep = allStepsRef.current.find(
      el => el.index === currentIndex,
    );

    if (!currentStep.validator) {
      setStepIndex(nextStepIndex);
    } else {
      const result = currentStep.validator();
      console.log(result);
    }
  }

  return (
    <WizardContxt.Provider
      value={{
        allSteps: allStepsRef.current,
        registerStep,
        handleStepChange,
        currentIndex,
      }}>
      {children}
    </WizardContxt.Provider>
  );
};

export default WizrdRootProvider;
