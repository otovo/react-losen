// @flow
import * as React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { type IntlType } from '../../../flowTypes';

import NewButton from '../Button/NewButton';

import {
  getButtonText,
  type Direction,
  type ButtonValues,
  type Context,
} from './utils';
import m from './messages';

/*
  * prop: previousTexts | nextTexts: Customize controls by providing custom texts
    based on wizard state. See example below.
    
  <Controls
    nextTexts={{
      start: 'Draw roof',
      default: 'Neste',
    }}
    previousTexts={{
      default: 'Go backwards',
    }}

    Note: Not all keys need to be specified in order to override a single one. In the example above
    only nextStart.start, nextStart.default and previousTexts.default are overridden.

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
} & IntlType;

class Controls extends React.Component<Props> {
  context: Context;

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

    return (
      <div className="tc mv3">
        <NewButton
          className="mb3"
          onClick={() => {
            if (this.context.isLastStep) {
              this.changeStep('complete');
            }
            this.changeStep('next');
          }}>
          {nextText}
        </NewButton>
        {!this.context.isFirstStep && (
          <div>
            <NewButton
              blank
              onClick={() => this.context.changeStep('previous')}>
              <span className="underline text-o-gray-disabled f5">
                {prevText}
              </span>
            </NewButton>
          </div>
        )}
      </div>
    );
  }
}

Controls.contextTypes = {
  changeStep: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
};

export default injectIntl(Controls);
