// @flow
import React, { Fragment } from 'react';
import { action } from '@storybook/addon-actions'; // eslint-disable-line

import Wizard from '../../src/new/NewWizard';

import Emoji from '../components/Emoji';

const NewWizardBasic = () => (
  <Fragment>
    <Emoji className="f-headline lh-copy" emoji="🤟" />
    <h1>New wizard</h1>
    <Wizard>
      <Wizard.Step name="firstStep">
        <h1>
          <Emoji className="f3" emoji="👍" /> First step
        </h1>
      </Wizard.Step>
    </Wizard>
  </Fragment>
);
export default NewWizardBasic;
