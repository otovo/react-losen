// @flow
import React, { createContext, useContext, useRef, useState } from 'react';

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
  const numStepsRef = useRef(0);
  const [currentIndex, setStepIndex] = useState(1);
  // const [steps, setSteps] = useState([]);

  function registerStep(stepRef) {
    // const stepIndex = !indexRef.current
    //   ? indexRef.current
    //   : indexRef.current + 1;

    // stepRef.current =co stepIndex;
    stepRef.current = ++numStepsRef.current;
    // indexRef.current = stepIndex;
  }

  return (
    <WizardContxt.Provider
      value={{
        stepsInTotal: numStepsRef.current,
        registerStep,
        setStepIndex,
        currentIndex,
      }}>
      {children}
    </WizardContxt.Provider>
  );
};

export default WizrdRootProvider;
