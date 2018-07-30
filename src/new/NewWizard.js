// @flow
import React, { type Node, Component, createContext } from 'react';
import StepWrapper, { type StepProps } from './StepWrapper';

type WizardProps = {
  children: Node,
};

type StepType = {
  name: string,
};

type ContextType = {|
  stepList: Array<StepType>,
|};

type ConsumerProps = {
  children: ContextType => Node,
};

type State = {
  context: ContextType,
};

const WizardContext = createContext();

function ConsumeValidator(props: ConsumerProps) {
  return (
    <WizardContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            '[React Losen]: Step and Controls must be rendered within the <Wizard /> component',
          );
        }
        if (typeof props.children === 'function') {
          return props.children(context);
        }
        return null;
      }}
    </WizardContext.Consumer>
  );
}

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
