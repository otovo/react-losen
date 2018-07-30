// @flow
import React, { type Node, Component } from 'react';
import StepWrapper, { type StepProps } from './StepWrapper';
import { WizardContext, type ContextType } from './WizardContext';
import { ConsumeValidator } from './ConsumeValidator';

type WizardProps = {
  children: Node,
};

type State = {
  context: ContextType,
};

class NewWizard extends Component<WizardProps, State> {
  static Step = (props: StepProps) => (
    <ConsumeValidator>
      {context => <StepWrapper {...context} {...props} />}
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
