// @flow
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import 'tachyons/css/tachyons.css'; // eslint-disable-line

import BasicExample from './BasicExample';

storiesOf('React Losen [deprecated]', module)
  .addDecorator(story => <div className="avenir tc">{story()}</div>)
  .add('Basic example', () => <BasicExample />);
