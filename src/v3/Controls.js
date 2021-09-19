// flow
import React from 'react';
import { useWizardContext } from './Wizard';

const Controls = ({}) => {
  const { currentIndex, setStepIndex, stepsInTotal } = useWizardContext();

  return (
    <>
      <button
        disabled={currentIndex === 1}
        onClick={() => {
          setStepIndex(currentIndex - 1);
        }}>
        Previous
      </button>
      <button
        disabled={currentIndex === stepsInTotal}
        onClick={() => {
          setStepIndex(currentIndex + 1);
        }}>
        Next
      </button>
    </>
  );
};

export default Controls;
