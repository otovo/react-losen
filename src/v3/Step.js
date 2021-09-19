// flow
import React, { useRef } from 'react';
import { useWizardContext } from './Wizard';

const Step = ({ children }) => {
  const stepRef = useRef();
  const { registerStep, currentIndex } = useWizardContext();

  if (!stepRef.current) {
    registerStep(stepRef);
  }

  if (stepRef.current !== currentIndex) {
    return null;
  }
  return (
    <>
      {children}
      <div
        style={{
          backgroundColor: 'pink',
          color: 'red',
        }}>
        StepIndex: <pre>{stepRef.current}</pre>
      </div>
    </>
  );
};

export default Step;
