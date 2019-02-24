// @flow
import React from 'react';
import { useControlsContext } from '../../v2/Wizard';

import Button from './Button';
import Emoji from './Emoji';

const Controls = () => {
  const {
    onNext,
    onPrevious,
    isFirst,
    isLast,
    isLoading,
  } = useControlsContext();
  return (
    <div className="flex items-center justify-center pa4">
      <Button onClick={onPrevious} disabled={isFirst}>
        <Emoji emoji="👈" /> <span className="ml3">Previous</span>
      </Button>
      <Button onClick={onNext} disabled={isLoading || isLast}>
        <span className="mr3">Next</span>{' '}
        <Emoji emoji={isLoading ? '😴' : '👉'} />
      </Button>
    </div>
  );
};
export default Controls;
