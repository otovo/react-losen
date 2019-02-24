// @flow
import React from 'react';
import { useControlsContext } from '../../v2/Wizard';

import Button from './Button';
import Emoji from './Emoji';

type Props = {
  // children: ReactNode,
};

const Controls = (props: Props) => {
  console.log('Controls says hi');
  const { onNext, onPrevious, isFirstStep, isLastStep } = useControlsContext();
  return (
    <div className="flex items-center justify-center pa4">
      <Button onClick={onPrevious} disabled={isFirstStep}>
        <Emoji emoji="👈" /> <span className="ml3">Previous</span>
      </Button>
      <Button onClick={onNext} disabled={isLastStep}>
        <span className="mr3">Next</span> <Emoji emoji="👉" />
      </Button>
    </div>
  );
};
export default Controls;
