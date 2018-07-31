// @flow
import React, { Component, createContext, type ElementProps } from 'react';

import { ConsumeValidator } from './ConsumeValidator';
import StepWrapper from './StepWrapper';
import type { WizardProps, WizardState } from './flowtypes';

/**
 * Explicitly specifying the type of our context value
 * doesn't work (I blame Storybook).
 * But Flow can still infer the type as long as we place the
 * instantiaton in the same file as the Provider.
 */
export const WizardContext = createContext(null);

class NewWizard extends Component<WizardProps, WizardState> {
  static Step = (props: ElementProps<typeof StepWrapper>) => (
    <ConsumeValidator>
      {context => <StepWrapper context={context} {...props} />}
    </ConsumeValidator>
  );

  state = {
    context: {
      stepList: [],
    },
  };

  render() {
    return (
      <WizardContext.Provider value={this.state.context}>
        {this.props.children}
      </WizardContext.Provider>
    );
  }
}

export default NewWizard;
