// flow
import React from 'react';
import { useWizardContext } from './Wizard';

const Controls = ({}) => {
  const { currentIndex, handleStepChange, allSteps } = useWizardContext();

  return (
    <>
      <button
        type="button"
        disabled={currentIndex === 0}
        onClick={() => {
          handleStepChange(currentIndex - 1);
        }}>
        Previous
      </button>
      <button
        type="button"
        disabled={currentIndex === allSteps.length - 1}
        onClick={() => {
          handleStepChange(currentIndex + 1);
        }}>
        Next
      </button>
    </>
  );
};

export default Controls;
