// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import { getButtonText, type Direction, type ButtonValues } from './utils';

type Props = {
  nextTexts: ButtonValues,
  previousTexts: ButtonValues,
};

class Controls extends React.Component<Props> {
  changeStep = (direction: Direction) => {
    this.context.changeStep(direction);
  };

  render() {
    const nextText = getButtonText(this.props.nextTexts, this.context);
    const prevText = getButtonText(this.props.previousTexts, this.context);

    // TODO: Add disabled prop to NewButton.js and change component from Button to NewButton
    return (
      <React.Fragment>
        <div className="tc">
          <div className="mb3">
            <Button
              disabled={!this.context.enableNext}
              onClick={() => {
                if (this.context.isLastStep) {
                  this.changeStep('complete');
                }
                this.changeStep('next');
              }}>
              {nextText}
            </Button>
          </div>
          {!this.context.isFirstStep && (
            <div>
              <Button
                blank
                disabled={!this.context.enableNext}
                onClick={() => this.context.changeStep('previous')}>
                <span className="underline text-o-gray-disabled f5">
                  {prevText}
                </span>
              </Button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

Controls.contextTypes = {
  changeStep: PropTypes.func.isRequired,
  enableNext: PropTypes.bool.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default Controls;
