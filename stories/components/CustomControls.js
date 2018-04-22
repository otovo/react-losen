// @flow
import React from 'react';
import Controls from '../../src/Controls';

import Button from './Button';
import Emoji from './Emoji';

const CustomControls = () => {
  return (
    <Controls
      render={(onNext, onPrevious, isFirstStep, isLastStep) => (
        <div className="flex items-center justify-center pa4">
          <Button onClick={onPrevious} disabled={isFirstStep}>
            <Emoji>👈</Emoji> <span className="ml3">Previous</span>
          </Button>

          <Button onClick={onNext}>
            <span className="mr3">Next</span> <Emoji>👉</Emoji>
          </Button>
        </div>
      )}
    />
  );
};
export default CustomControls;
