// @flow
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line

import 'tachyons/css/tachyons.css'; // eslint-disable-line

import Wizard from '../src/Wizard';
import Step from '../src/Step';

import Emoji from './components/Emoji';
import CustomControls from './components/CustomControls';

storiesOf('React losen', module)
  .addDecorator(story => <div className="avenir tc">{story()}</div>)
  .add('Basic wizard', () => (
    <Wizard
      onComplete={action('wizard completed')}
      render={() => (
        <Fragment>
          <Step name="first">
            <Emoji className="f-headline lh-copy" emoji="☝️" />
            <div className="mt2 f6 lh-copy">
              <p className="mv0">Step 1</p>
            </div>
          </Step>
          <Step name="second">
            <Emoji className="f-headline lh-copy" emoji="✌️" />
            <div className="mt2 f6 lh-copy">
              <p className="mv0">Step 2</p>
            </div>
          </Step>
          <Step name="third">
            <Emoji className="f-headline lh-copy" emoji="🤟" />
            <div className="mt2 f6 lh-copy">
              <p className="mv0">Step 3</p>
            </div>
          </Step>
          <CustomControls />
        </Fragment>
      )}
    />
  ));
