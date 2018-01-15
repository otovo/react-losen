// @flow
import { injectIntl } from 'react-intl';

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import { getButtonText, type Direction, type ButtonValues } from './utils';
import m from './messages';

/*
  Customize by providing custom texts. Example:
*/

const mergeDefaultAndProps = (intl, nextTexts?, previousTexts?) => ({
  nextTexts: {
    start: intl.formatMessage(m.nextStart),
    finish: intl.formatMessage(m.nextFinish),
    default: intl.formatMessage(m.nextDefault),
    ...nextTexts,
  },
  previousTexts: {
    start: intl.formatMessage(m.previousStart),
    finish: intl.formatMessage(m.previousFinish),
    default: intl.formatMessage(m.previousDefault),
    ...previousTexts,
  },
});

type Props = {
  nextTexts?: ButtonValues,
  previousTexts?: ButtonValues,
  intl: {
    formatMessage: Function,
  },
};

class Controls extends React.Component<Props> {
  changeStep = (direction: Direction) => {
    this.context.changeStep(direction);
  };

  render() {
    const mergedTexts = mergeDefaultAndProps(
      this.props.intl,
      this.props.nextTexts,
      this.props.previousTexts,
    );

    const nextText = getButtonText(mergedTexts.nextTexts, this.context);
    const prevText = getButtonText(mergedTexts.previousTexts, this.context);

    // TODO: Add disabled prop to NewButton.js and change component from Button to NewButton
    return (
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
    );
  }
}

Controls.contextTypes = {
  changeStep: PropTypes.func.isRequired,
  enableNext: PropTypes.bool.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default injectIntl(Controls);
