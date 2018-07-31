// @flow
import React, { type Node } from 'react';

import { WizardContext } from './NewWizard';
import type { ContextType } from './flowtypes';

type ConsumerProps = {
  children: (obj: ContextType) => Node,
};

export function ConsumeValidator(props: ConsumerProps) {
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
