// @flow
import { useEffect } from 'react';
import { useStepContext } from './Wizard';

type Props = {
  children: React$Node,
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

  return children;
};

Step.defaultProps = {
  validator: null,
  autoSkip: false,
};

export default Step;
