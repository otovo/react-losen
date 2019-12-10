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
    activeIndex: number,
  ) => React$Node,
|};

const Controls = ({ render }: Props) => {
  const {
    onNext,
    onPrevious,
    isFirst,
    isLast,
    isLoading,
    activeIndex,
  } = useContext(ControlsContext);

  return render(onNext, onPrevious, isFirst, isLast, isLoading, activeIndex);
};

export default Controls;
