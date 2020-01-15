// @flow
import { useEffect, createContext, useContext } from 'react';

export const StepContext = createContext<Object>(null);

type Props = {|
  children: React$Node,
  ...Losen$Step,
|};

const Step = ({ children, name, validator, autoSkip, state }: Props) => {
  const {
    registerStep,
    activeStep,
    updateStep,
    initialized,
    stateManager,
  } = useContext(StepContext);

  useEffect(() => {
    if (!initialized) {
      registerStep({
        name,
        validator,
        autoSkip,
      });
    }
  }, [name, validator, autoSkip, initialized, registerStep]);

  useEffect(() => {
    if (initialized) {
      updateStep({
        name,
        validator,
        autoSkip,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSkip, validator, initialized]);

  useEffect(() => {
    if (state && stateManager) {
      state.forEach(item => {
        const key = Object.keys(item)[0];
        stateManager.setItem(key, item[key]);
      });
    }
  }, [state, stateManager]);

  if (activeStep.name !== name) {
    return null;
  }

  return children;
};

Step.defaultProps = {
  validator: null,
  autoSkip: false,
  state: undefined,
};

export default Step;
