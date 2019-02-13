// @flow
import React from 'react';
import Controls from '../../src/Controls';

import Button from './Button';
import Emoji from './Emoji';

const CustomControls = () => (
  <Controls
    render={(onNext, onPrevious, isFirstStep) => (
      <div className="flex items-center justify-center pa4">
        <Button onClick={onPrevious} disabled={isFirstStep}>
          <Emoji emoji="👈" /> <span className="ml3">Previous</span>
        </Button>

        <Button onClick={onNext}>
          <span className="mr3">Next</span> <Emoji emoji="👉" />
        </Button>
      </div>
    )}
  />
);
export default CustomControls;
