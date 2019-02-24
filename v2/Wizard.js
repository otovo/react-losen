// @flow
import React, { createContext, useState, useContext } from 'react';

export const StepContext = createContext(null);
export const ControlsContext = createContext(null);

export function useStepContext() {
  return useContext(StepContext);
}

export function useControlsContext() {
  return useContext(ControlsContext);
}

type Props = {
  // onComplete: (wizardData: Object, currentStep: string) => void,
  // onStepChange: OnStepChangeType => void,
  // debug?: boolean,
  // render: (stepData: Object, func: OnPartialChange) => Node,
  // onError?: (error: Object) => void,
  children: React$Node,
};

// type State = {
// activeStep: Losen$Step,
// activeStepIndex: number,
// direction: Losen$Direction,
// isFirstStep: boolean,
// isLastStep: boolean,
// steps: Array<Losen$Step>,
// stepData: Object,
// };

const Wizard = ({ children }: Props) => {
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  const registerStep = step => {
    const alreadyRegistered = steps.map(el => el.name).includes(step.name);
    if (!alreadyRegistered) {
      setSteps(prevSteps => [...prevSteps, step]);
    }
  };

  function onNext() {
    setIndex(steps.length > index + 1 ? index + 1 : index);
  }

  function onPrevious() {
    setIndex(index - 1 >= 0 ? index - 1 : index);
  }

  return (
    <ControlsContext.Provider
      value={{
        onNext,
        onPrevious,
        isFirst: index === 0,
        isLast: index === steps.length - 1,
      }}>
      <StepContext.Provider
        value={{
          registerStep,
          activeStep: steps[index] || {},
          steps,
        }}>
        {children}
      </StepContext.Provider>
    </ControlsContext.Provider>
  );
};

export default Wizard;
