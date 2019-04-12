// @flow
import { useEffect, createContext, useContext } from 'react';

export const StepContext = createContext(null);

type Props = {
  children: React$Node,
} & Losen$Step;

const Step = ({ children, name, validator, autoSkip }: Props) => {
  const { registerStep, activeStep, updateStep, initialized } = useContext(
    StepContext,
  );

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

  return children;
};

Step.defaultProps = {
  validator: null,
  autoSkip: false,
};

export default Step;
