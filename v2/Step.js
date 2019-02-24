// @flow
import React from 'react';
import { useStepContext } from './Wizard';

type Props = {
  children: ReactNode,
} & Losen$Step;

const Step = ({ children, name, validator, autoSkip }: Props) => {
  const { registerStep, activeStep } = useStepContext();
  console.log(registerStep, activeStep);

  registerStep({
    name,
    validator,
    autoSkip,
  });

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
  validator: () => null,
  autoSkip: false,
};

export default Step;
