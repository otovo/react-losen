// @flow
import React, { useCallback, useState } from 'react';
import { Step } from '../../src/v3';

const StepWithInput = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  function handleChange(event) {
    setError('');
    setText(event.target.value);
  }

  return (
    <Step
      validator={() => {
        console.log('IM VALIDTATING NOW', text);
        /**
         * This doesn't work as the text reference is stale.
         * Solution:We need this function to update when the text changes
         */
        if (!text) {
          setError('Please write something to continue');
          return false;
        }
        return true;
      }}>
      <textarea
        className="w-100 h3"
        placeholder="Step 3: Write something"
        value={text}
        onChange={handleChange}
      />
      {error && <p className="red">{error}</p>}
    </Step>
  );
};

export default StepWithInput;
