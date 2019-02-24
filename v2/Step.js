// @flow
import React, { useEffect } from 'react';
import { useStepContext } from './Wizard';

type Props = {
  children: ReactNode,
} & Losen$Step;

const Step = ({ children, name, validator, autoSkip }: Props) => {
  const {
    registerStep,
    activeStep,
    updateStep,
    initialized,
  } = useStepContext();

  const stepInfo = {
    name,
    validator,
    autoSkip,
  };

  useEffect(() => {
    if (!initialized) {
      registerStep(stepInfo);
    }
  }, [name]);

  useEffect(() => {
    if (initialized) {
      updateStep(stepInfo);
    }
  }, [autoSkip, validator]);

  if (activeStep.name !== name) {
    return null;
  }

  return (
    <>
      <h2>Step {`${name}`}</h2>
      <div className="flex pa4 bg-lightest-blue navy br2">{children}</div>
    </>
  );
};

Step.defaultProps = {
  validator: null,
  autoSkip: false,
};

export default Step;
