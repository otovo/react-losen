// @flow
import { createContext, useContext } from 'react';

export const ControlsContext = createContext<Object>(null);

type Props = {|
  render: (
    onNext: Function,
    onPrevious: Function,
    isFirst: boolean,
    isLast: boolean,
    isLoading: boolean,
  ) => React$Node,
|};

const Controls = ({ render }: Props) => {
  const { onNext, onPrevious, isFirst, isLast, isLoading } = useContext(
    ControlsContext,
  );

  return render(onNext, onPrevious, isFirst, isLast, isLoading);
};

export default Controls;
