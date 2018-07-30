// @flow
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line

import 'tachyons/css/tachyons.css'; // eslint-disable-line

import BasicExample from './BasicExample';

storiesOf('React Losen (new!)', module)
  .addDecorator(story => <div className="avenir tc">{story()}</div>)
  .add('Basic example', () => <BasicExample />);
