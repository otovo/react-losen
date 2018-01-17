// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T, injectIntl } from 'react-intl';

import { Alert } from '../../components/';
import JumpInAnimation from '../../components/JumpInAnimation';
import NewButton from '../../components/Button/NewButton';
import { type IntlType } from '../../../flowTypes';

import m from './messages';

type Props = IntlType;

type Context = {
  errorMessage: string,
  dismissError: () => void,
};

const ErrorMessage = ({ intl }: Props = {}, context: Context) => (
  <div
    role="button"
    onKeyDown={key => {
      if (!!context.errorMessage && key.key === 'Escape') {
        context.dismissError();
      }
    }}
    tabIndex="0"
    onClick={() => {
      if (context.errorMessage) {
        context.dismissError();
      }
    }}
    className={`absolute absolute--fill ${
      context.errorMessage ? 'z-1' : 'no-click'
    }`}>
    <div className="dt h-100 center">
      <div className="dtc v-mid pb6">
        <JumpInAnimation renderChild={!!context.errorMessage}>
          <div
            className="no-outline"
            role="button"
            onKeyDown={event => {
              event.stopPropagation();
            }}
            tabIndex="0"
            onClick={event => {
              event.stopPropagation();
            }}>
            <Alert
              title={intl.formatMessage(m.wordError)}
              className="o-shadow1 mw6">
              <p className="mt0">{context.errorMessage}</p>
              <div className="tc">
                <NewButton
                  square
                  passive
                  color="white"
                  onClick={() => context.dismissError()}>
                  <T {...m.wordOk} />
                </NewButton>
              </div>
            </Alert>
          </div>
        </JumpInAnimation>
      </div>
    </div>
  </div>
);

ErrorMessage.contextTypes = {
  errorMessage: PropTypes.string.isRequired,
  dismissError: PropTypes.func.isRequired,
};

export default injectIntl(ErrorMessage);
