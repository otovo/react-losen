// @flow
import React, { useState } from 'react';

import { Step } from '../../src';

const StepWithInput = () => {
  const [text, setText] = useState('');
  return (
    <Step name="StepWithInput">
      <textarea
        placeholder={`Write something to ${StepWithInput}`}
        value={text}
        onChange={ev => setText(ev.target.value)}
      />
    </Step>
  );
};

export default StepWithInput;
