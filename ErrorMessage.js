// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T, injectIntl } from 'react-intl';

import { Alert } from '../../components/';
import JumpInAnimation from '../../components/JumpInAnimation';
import NewButton from '../../components/Button/NewButton';
import { type IntlType } from '../../../flowTypes';

import m from './messages';

type Props = IntlType;

type Context = {
  errorNode: Node,
  dismissError: () => void,
};

const ErrorMessage = ({ intl }: Props = {}, context: Context) => (
  <div
    role="button"
    onKeyDown={key => {
      if (!!context.errorNode && key.key === 'Escape') {
        context.dismissError();
      }
    }}
    tabIndex="0"
    onClick={() => {
      if (context.errorNode) {
        context.dismissError();
      }
    }}
    className={`absolute absolute--fill ${
      context.errorNode ? 'z-1' : 'no-click z-1'
    }`}>
    <div className="dt h-100 center">
      <div className="dtc v-mid pb6">
        <JumpInAnimation name="error-message" distance={80}>
          {context.errorNode ? (
            <div
              className="no-outline"
              role="button"
              onKeyDown={event => event.stopPropagation()}
              tabIndex="0"
              onClick={event => event.stopPropagation()}>
              <Alert
                title={intl.formatMessage(m.errorTitle)}
                className="o-shadow1 mw6 bg-white tc">
                {typeof context.errorNode === 'string' && (
                  <p className="mt0">{context.errorNode}</p>
                )}
                {typeof context.errorNode === 'object' && context.errorNode}
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
          ) : null}
        </JumpInAnimation>
      </div>
    </div>
  </div>
);

ErrorMessage.contextTypes = {
  errorNode: PropTypes.node,
  dismissError: PropTypes.func.isRequired,
};

export default injectIntl(ErrorMessage);
