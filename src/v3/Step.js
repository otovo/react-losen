// flow
import React, { useRef } from 'react';
import { useWizardContext } from './Wizard';

const Step = ({ children, validator }) => {
  const stepRef = useRef();
  const { registerStep, currentIndex } = useWizardContext();

  if (!stepRef.current) {
    registerStep(stepRef, validator);
  }

  /**
   * When the validation function changes, we need to update the ref?
   *
   * We expect that the validation function will change whenever it's local
   * state changes
   */

  // useEffect(() => {
  //   updateStep(stepRef, validator);
  // }, [validator]);

  if (stepRef.current.index !== currentIndex) {
    return null;
  }

  return (
    <>
      {children}
      <div
        className="pa3 f6"
        style={{
          backgroundColor: 'pink',
          color: 'red',
          textAlign: 'left',
        }}>
        <p className="mv0">
          StepIndex: <pre className="dib mv0">{stepRef.current.index}</pre>
        </p>
        <p className="mv0">
          Step ID: <pre className="dib mv0">{stepRef.current.id}</pre>
        </p>
        <p className="mv0">
          Has validation?{' '}
          <pre className="dib mv0">
            {typeof validator === 'function' ? 'yep' : 'nope'}
          </pre>
        </p>
      </div>
    </>
  );
};

export default Step;
