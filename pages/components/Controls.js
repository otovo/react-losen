// @flow
import React, { useContext } from 'react';
import { ControlsContext } from '../../src';

import Button from './Button';
import Emoji from './Emoji';

const Controls = () => {
  const { onNext, onPrevious, isFirst, isLast, isLoading } = useContext(
    ControlsContext,
  );
  return (
    <div className="flex items-center justify-center pa4">
      <Button onClick={onPrevious} disabled={isLoading || isFirst}>
        <Emoji emoji="👈" /> <span className="ml3">Previous</span>
      </Button>
      <Button onClick={onNext} disabled={isLoading}>
        <span className="mr3">{isLast ? 'Finish' : 'Next'}</span>{' '}
        <Emoji emoji={isLoading ? '😴' : '👉'} />
      </Button>
    </div>
  );
};
export default Controls;
