// @flow
import { Component, type Node } from 'react';
import PropTypes from 'prop-types';

import { type Direction, type Context } from './utils';

/**
 * Wizard Controls
 *
 * Provides the neccessary functions for controlling the wizard through a render-prop
 */

type Func = () => void;
type Props = {
  render: (
    onNext: Func,
    onPrevious: Func,
    isLast: boolean,
    isFirst: boolean,
  ) => Node,
};

class Controls extends Component<Props> {
  context: Context;

  changeStep = (direction: Direction) => {
    this.context.changeStep(direction);
  };

  onNext = () => {
    if (this.context.isLastStep) {
      this.context.changeStep('complete');
    } else {
      this.context.changeStep('next');
    }
  };

  onPrevious = () => {
    if (!this.context.isFirstStep) {
      this.context.changeStep('previous');
    }
  };

  render() {
    const { isFirstStep, isLastStep } = this.context;
    return this.props.render(
      this.onNext,
      this.onPrevious,
      isFirstStep,
      isLastStep,
    );
  }
}

Controls.contextTypes = {
  changeStep: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default Controls;
